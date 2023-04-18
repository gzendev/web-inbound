import {Component, Input, OnInit, Output, EventEmitter, TemplateRef} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Observable, Observer, forkJoin} from 'rxjs';
import {Table} from 'primeng/table';
import {TranslateService} from '@ngx-translate/core';
import {SelectItem, SortEvent} from 'primeng/api';
import {format} from 'date-fns/esm';
import forOwn from 'lodash-es/forOwn';

import {ConfirmDialogComponent} from '@components/home/general/confirm-dialog/confirm-dialog.component';
import {DeleteRowDialogComponent} from './delete-row-dialog/delete-row-dialog.component';
import {ImporterDialogData} from '@components/gefco/gefco-importer/gefco-importer.component';

import {Constants} from '@utils/constants';
import {TableTemplate} from '@models/table-template.model';
import {TableColumn} from '@models/table-column.model';
import {StorageUtils} from '@utils/storage.utils';
import { AlertService } from '@app/services/alert.service';

export interface Column {
  field: string;
  header: string;
  type: string;
}

interface ColumnSort {
  field: string;
  order: number;
}

export interface RowActionEvent {
  row: any;
  observer: Observer<any>;
}

@Component({
  selector: 'app-gefco-table',
  templateUrl: './gefco-table.component.html',
})
export class GefcoTableComponent implements OnInit {

  private static readonly SEARCH_LIMIT = 1000;

  @Input()
  public set template(tableTemplate: TableTemplate) {
    if (tableTemplate) {
      this.tableTemplate = tableTemplate;
      this.tableColumnByAttribute = this.getTableColumnByAttribute();
      this.columns = this.getColumns();
      this.visibleColumns = this.getVisibleColumns();
      this.multiSortMeta = this.getMultiSortMeta();
      if (!this.tableTemplate.pageFirst) {
        this.tableTemplate.pageFirst = 0;
      }
      if (!this.tableTemplate.pageSize) {
        this.tableTemplate.pageSize = 15;
      }
    }
  }

  @Input()
  public set rows(rows: any[]) {
    this.formatRows(rows);
    this.tableData = rows;
  }

  @Input()
  public showViewIcon = true;
  @Input()
  public showEditIcon = true;
  @Input()
  public showDeleteIcon = true;
  @Input()
  public menu: TemplateRef<any>;
  @Input()
  public listPermission: boolean;
  @Input()
  public writePermission: boolean;
  @Input()
  public readPermission: boolean;
  @Input()
  public importer: boolean;
  @Input()
  public importerData: ImporterDialogData;
  @Input()
  public showEditAll: boolean;
  @Output()
  public viewRow = new EventEmitter<any>();
  @Output()
  public editRow = new EventEmitter<any>();
  @Output()
  public mapRow = new EventEmitter<any>();
  @Output()
  public deleteRow = new EventEmitter<RowActionEvent>();
  @Output()
  public selectRow = new EventEmitter<any>();
  @Output()
  public selectedRows : any [];
  @Output()
  public expandRow = new EventEmitter<any>();
  @Output()
  public importFileEvt = new EventEmitter<RowActionEvent>();
  @Output()
  public downloadTemplateEvt = new EventEmitter<RowActionEvent>();
  @Output()
  public exportTable = new EventEmitter<TableColumn[]>();

  public tableData: any[];
  public tableTemplate: TableTemplate;
  public tableColumnByAttribute: Map<string, TableColumn>;
  public columns: Column[];
  public visibleColumns: Column[];
  public multiSortMeta: ColumnSort[];
  public pageSizeOptions: SelectItem[];
  public limit = GefcoTableComponent.SEARCH_LIMIT;
  

  constructor(private translateService: TranslateService,
              private dialog: MatDialog,
              private alertService: AlertService) {

  }

  public ngOnInit(): void {
    this.translateService.get('registros-lower').subscribe((translation) => {
      this.pageSizeOptions = [
        {label: `10 ${translation}`, value: 10},
        {label: `15 ${translation}`, value: 15},
        {label: `20 ${translation}`, value: 20},
        {label: `50 ${translation}`, value: 50},
        {label: `100 ${translation}`, value: 100},
      ];
    });
  }

  public onPageChange(e: any): void {
    this.tableTemplate.pageFirst = e.first;
    StorageUtils.setTemplate(this.tableTemplate);
  }

  public onPageSizeChange(): void {
    this.tableTemplate.pageFirst = 0;
    StorageUtils.setTemplate(this.tableTemplate);
  }

  public onColumnSort(event: any): void {
    this.tableTemplate.columns.forEach((tableColumn) => {
      const sortMeta = (event.multisortmeta as any[]).find((currentSortMeta) => {
        return currentSortMeta.field === tableColumn.attribute;
      });
      if (sortMeta) {
        tableColumn.gridSort = sortMeta.order === 1 ? 'ASC' : 'DESC';
      } else {
        tableColumn.gridSort = null;
      }
    });
    StorageUtils.setTemplate(this.tableTemplate);
  }

  public onColumnReorder(event: any): void {
    const reorderedColumn = event.columns[event.dropIndex];
    const previousColumn = event.dropIndex > 0 ? event.columns[event.dropIndex - 1] : null;

    const reorderedTableColumnIndex = this.tableTemplate.columns.findIndex((tableColumn) => {
      return tableColumn.attribute === reorderedColumn.field;
    });
    const reorderedTableColumn = this.tableTemplate.columns.splice(reorderedTableColumnIndex, 1)[0];

    const previousTableColumnIndex = previousColumn ? this.tableTemplate.columns.findIndex((tableColumn) => {
      return tableColumn.attribute === previousColumn.field;
    }) : null;
    this.tableTemplate.columns.splice(previousTableColumnIndex ? previousTableColumnIndex + 1 : 0, 0, reorderedTableColumn);

    let position = 1;
    this.tableTemplate.columns.forEach((tableColumn) => {
      tableColumn.gridPosition = position;
      position += 1;
    });
    StorageUtils.setTemplate(this.tableTemplate);
    this.columns = this.getColumns();
  }

  public onColumnsVisibilityChange(event: any): void {
    this.tableTemplate.columns.forEach((tableColumn) => {
      const column = (event.value as Column[]).find((currentColumn) => {
        return currentColumn.field === tableColumn.attribute;
      });
      tableColumn.visible = column ? true : false;
    });
    StorageUtils.setTemplate(this.tableTemplate);
    this.visibleColumns = this.getVisibleColumns();
    this.multiSortMeta = this.getMultiSortMeta();
  }

  public onRowSelect(event: any): void {
    this.selectRow.emit(event.data);
  }

  public onRowExpand(event: any): void {
    const observable = new Observable((observer: Observer<any>) => {
      this.expandRow.emit({observer, row: event.data});
    });
    observable.subscribe((rows) => {
      this.formatRows(rows);
      event.data.expanded = rows;
    }, (err) => {
      console.log(err);
    });
  }

  public onViewRow(row: any): void {
    this.viewRow.emit(row);
  }

  public onEditRow(row: any): void {
    this.editRow.emit(row);
  }

  public onMapView(row:any):void{
    this.mapRow.emit(row);
  }

  public onDeleteRow(row: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = 'auto';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      row,
      confirmEmitter: this.deleteRow,
    };
    this.dialog.open(DeleteRowDialogComponent, dialogConfig);
  }

  public onExportRows(): void {
    const tableColumns: TableColumn[] = [];
    this.tableTemplate.columns.forEach((tableColumn) => {
      this.translateService.get(tableColumn.name).subscribe((columnTitleTranslation) => {
        tableColumns.push(new TableColumn({...tableColumn}));
        tableColumns[tableColumns.length - 1].label = columnTitleTranslation;
      });
    });
    this.exportTable.emit(tableColumns);
  }

  public onEditRows(): void {
    //alert(this.selectedRows.length);
  }

  public importFile(): void {
    this.importFileEvt.emit();
  }

  public downloadTemplate(): void {
    this.downloadTemplateEvt.emit();
  }

  public sortColumnData(event: SortEvent): void {
    event.data.sort((data1, data2) => {
      const value1 = data1[event.multiSortMeta[0].field];
      const value2 = data2[event.multiSortMeta[0].field];
      const valueType = this.tableColumnByAttribute.get(event.multiSortMeta[0].field).type;
      let result;
      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (valueType === TableColumn.DATE || valueType === TableColumn.DATE_TIME) {
        const value1InMillis = data1[`${event.multiSortMeta[0].field}InMilis`];
        const value2InMillis = data2[`${event.multiSortMeta[0].field}InMilis`];
        result = (value1InMillis < value2InMillis) ? -1 : (value1InMillis > value2InMillis) ? 1 : 0;
      } else {
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;
      }
      return (event.multiSortMeta[0].order * result);
    });
  }

  public filterGlobal(table: Table, search: string): void {
    table.filterGlobal(search, 'contains');
    this.tableTemplate.search = search;
    StorageUtils.setTemplate(this.tableTemplate);
  }

  public filterColumn(table: Table, search: string, field: string): void {
    table.filter(search, field, 'contains');
    const tableColumn = this.tableColumnByAttribute.get(field);
    tableColumn.search = search;
    StorageUtils.setTemplate(this.tableTemplate);
  }

  public showParcialResultDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '40%';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      title: 'grilla.resultado-parcial.titulo',
      content: 'grilla.resultado-parcial.descripcion',
      alert: true,
    };
    this.dialog.open(ConfirmDialogComponent, dialogConfig);
  }

  private getTableColumnByAttribute(): Map<string, TableColumn> {
    const tableColumByAttribute: Map<string, TableColumn> = new Map();
    this.tableTemplate.columns.forEach((tableColumn) => {
      tableColumByAttribute.set(tableColumn.attribute, tableColumn);
    });
    return tableColumByAttribute;
  }

  private getColumns(): Column[] {
    const columns: Column[] = [];
    
    this.tableTemplate.columns.forEach((tableColumn) => {
      this.translateService.get(tableColumn.name).subscribe((nameTranslation) => {
        columns.push({field: tableColumn.attribute, header: nameTranslation, type: tableColumn.type});
      });
    });
    return columns;
  }

  private getVisibleColumns(): Column[] {
    const columns: Column[] = [];
    this.tableTemplate.columns.forEach((tableColumn) => {
      if (tableColumn.visible) {
        this.translateService.get(tableColumn.name).subscribe((nameTranslation) => {
          columns.push({field: tableColumn.attribute, header: nameTranslation, type: tableColumn.type});
        });
      }
    });
    return columns;
  }

  private getMultiSortMeta(): ColumnSort[] {
    const columns: ColumnSort[] = [];
    this.tableTemplate.columns.forEach((tableColumn) => {
      if (tableColumn.visible && tableColumn.gridSort) {
        if (tableColumn.gridSort === 'ASC') {
          columns.push({field: tableColumn.attribute, order: 1});
        } else if (tableColumn.gridSort === 'DESC') {
          columns.push({field: tableColumn.attribute, order: -1});
        }
      }
    });
    if (columns.length === 0) {
      return null;
    }
    return columns;
  }

  private formatRows(rows: any[]): void {
    forkJoin(
      this.translateService.get('si'),
      this.translateService.get('no')
    ).subscribe((booleanTranslations) => {
      if (rows && rows.length > 0) {
        rows.forEach((row) => {
          row.activoBoolean = this.isActivo(row);
          if(row.activoBoolean)
            row.criticoEta = this.isCambioEta(row);
          forOwn(row, (value, key) => {
            const tableColumn = this.tableColumnByAttribute.get(key);
            if (tableColumn) {
              switch (tableColumn.type) {
                case TableColumn.DATE:
                  row[key] = value ? format(new Date(value), Constants.DATE_FORMAT) : null;
                  row[`${key}InMilis`] = value;
                  break;
                case TableColumn.DATE_TIME:
                  row[key] = value ? format(new Date(value), Constants.DATE_TIME_FORMAT) : null;
                  row[`${key}InMilis`] = value;
                  break;
                  case TableColumn.TIME:
                  //row[key] = value ? format(new Date(value).setHours(new Date(value).getUTCHours()), Constants.TIME_FORMAT) : null;
                  row[key] = value ? format(new Date(value), Constants.TIME_FORMAT) : null;
                  row[`${key}InMilis`] = value;
                  break;
                case TableColumn.BOOLEAN:
                  row[key] = value === true ? booleanTranslations[0] : booleanTranslations[1];
                  break;
                default:
                  break;
              }
            }
          });
        });
      } else {
        let errorMessage = "Sin resultados para el filtro seleccionado";
        this.alertService.danger(errorMessage);
      }
    }, (error => {
      this.alertService.danger(error);
    }));
  }

  private isActivo(row: any): boolean {
    if(row.vin)
      return true;
    
    return (row.activo == null || row.activo == undefined) || row.activo;
  }

  private isCambioEta(row: any): string {
    if(row.vin)
      return "";

    if((row.cambioEta == null || row.cambioEta == undefined) || row.cambioEta)
      return "eta";
    else if(!(row.comJdCritico == null || row.comJdCritico == undefined) || row.comJdCritico)
      return "critico";
    
    return "";
  }

}
