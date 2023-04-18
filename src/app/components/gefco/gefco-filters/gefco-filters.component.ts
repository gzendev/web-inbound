import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatExpansionPanel } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Observable, forkJoin } from "rxjs";
import isString from "lodash-es/isString";
import sortBy from "lodash-es/sortBy";

import { ColumnFilter } from "@models/column-filter.model";
import { FilterOperator } from "@models/filter-operator.model";
import { TableTemplate } from "@models/table-template.model";
import { TableColumn } from "@models/table-column.model";



export interface Metadata {
  [key: string]: MetadataValue;
}

export interface MetadataValue {
  component: string;
  placeholder?: string;
  items?: MetadataItem[];
  onlyOperators?: string[];
  item?: MetadataItem;
  filter?: string;
  filterCallback?: (filter: string) => Observable<MetadataItem[]>;
  selectCallback?: (item: MetadataItem) => void;
}

export interface MetadataItem {
  id: any;
  description: string;
}

@Component({
  selector: "app-gefco-filters",
  templateUrl: "./gefco-filters.component.html",
})
export class GefcoFiltersComponent implements OnInit {
  private static readonly COMPONENT_AUTOCOMPLETE = "autocomplete";
  private static readonly COMPONENT_SELECT = "select";

  @Input()
  public set template(tableTemplate: TableTemplate) {
    if (tableTemplate) {
      this.tableTemplate = new TableTemplate(tableTemplate);
      this.initFilters();
      this.countFilters();
    }
  }

  @Input()
  public metadata: Metadata;
  @Output()
  public search = new EventEmitter<TableColumn[]>();

  public newArray : [];
  public tableTemplate: TableTemplate;
  public operators: FilterOperator[];
  public filtersCount: number;
  public keepOpened = false;

  @ViewChild("panel")
  private panel: MatExpansionPanel;

  constructor(private translateService: TranslateService) {
    this.filtersCount = 0;
  }

  public ngOnInit(): void {

    this.initOperators();
    

  }

  public showOnlyOperators(
    tableColumn: TableColumn,
    operator: FilterOperator
  ): boolean {
    if (
      this.metadata[tableColumn.name] != null &&
      this.metadata[tableColumn.name].onlyOperators !== null &&
      this.metadata[tableColumn.name].onlyOperators.length > 0
    ) {
      return (
        this.metadata[tableColumn.name].onlyOperators.filter(
          (x) => x == operator.id
        ).length > 0
      );
    }
    return true;
  }

  public shouldShowOperator(
    tableColumn: TableColumn,
    operator: FilterOperator
  ): boolean {
    if (
      (operator.id === ColumnFilter.CONTIENE ||
        operator.id === ColumnFilter.NO_CONTIENE) &&
      tableColumn.type !== TableColumn.STRING
    ) {
      return false;
    }
    if (
      operator.id === ColumnFilter.ENTRE &&
      tableColumn.type !== TableColumn.DATE &&
      tableColumn.type !== TableColumn.DATE_TIME &&
      tableColumn.type !== TableColumn.STRING &&
      tableColumn.type !== TableColumn.INTEGER &&
      tableColumn.type !== TableColumn.LONG &&
      tableColumn.type !== TableColumn.DOUBLE &&
      tableColumn.type !== TableColumn.BIG_DECIMAL
    ) {
      return false;
    }
    if (
      operator.id !== ColumnFilter.TODOS &&
      operator.id !== ColumnFilter.IGUAL &&
      operator.id !== ColumnFilter.EN &&
      (tableColumn.type === TableColumn.BOOLEAN ||
        this.getMetadataComponent(tableColumn))
    ) {
      return false;
    }
    return true;
  }

  public getMetadataValue(tableColumn: TableColumn): MetadataValue {
    if (this.metadata) {
      return this.metadata[tableColumn.attribute];
    }
    return null;
  }

  public getMetadataComponent(tableColumn: TableColumn): string {
    const metadataValue = this.getMetadataValue(tableColumn);
    return metadataValue ? metadataValue.component : null;
  }

  public compareMetadataItem(
    first: MetadataItem,
    other: MetadataItem
  ): boolean {
    if (!first && !other) {
      return true;
    }
    return other && first.id === other.id;
  }

  public displayMetadataItem(metadataItem: MetadataItem | string): string {
    if (!metadataItem) {
      return null;
    }
    if (isString(metadataItem)) {
      return metadataItem;
    }
    if (!metadataItem.description) {
      return String(metadataItem.id);
    }
    return `${metadataItem.description} (${metadataItem.id})`;
  }

  public filterMetadataItems(tableColumn: TableColumn): void {
    const metadataValue = this.getMetadataValue(tableColumn);
    if (metadataValue && metadataValue.filterCallback) {
      metadataValue.filterCallback(metadataValue.filter).subscribe((items) => {
        metadataValue.items = items;
      });
    }
  }

  public onMetadataItemSelected(
    tableColumn: TableColumn,
    item: MetadataItem
  ): void {
    localStorage.setItem("EstadoActual", item.id);
    this.onSearch(true);
    const metadataValue = this.getMetadataValue(tableColumn);
    
    if (metadataValue) {
      tableColumn.filter.value = item.id;
      if (metadataValue.selectCallback) {
        metadataValue.selectCallback(item);
      }
    }
  }

  public onSearch(keepOpenedFilters: any): void {
    if(keepOpenedFilters != true && keepOpenedFilters != false && keepOpenedFilters != null && keepOpenedFilters != undefined) {
      this.tableTemplate = keepOpenedFilters.template;
    }
    this.tableTemplate.columns.forEach((tableColumn) => {
      
      if (
        tableColumn.filter &&
        tableColumn.filter.value === null &&
        tableColumn.filter.operator !== "VACIO" &&
        tableColumn.filter.operator !== "NO_VACIO"
      ) {
        this.clearFilter(tableColumn);
      }
      if(tableColumn.filter != null && tableColumn.filter.operator === "EN"){
       tableColumn.filter.value = tableColumn.filter.arrayValue;
      } 
    });
    this.countFilters();
 
    this.search.emit(this.tableTemplate.columns);
    if(keepOpenedFilters === false || keepOpenedFilters.keepOpenedFilters === false) {
      if (!this.keepOpened) {
        this.panel.close();
      }
    }


    /* this.dividirCadena(); */
  }

  /* dividirCadena(){
    for (var i=0; i < this.tableTemplate.columns.length; i++) {
      if(this.tableTemplate.columns[i].filter.arrayValue != [] ){
        var arrayStrings = this.tableTemplate.columns[i].filter.arrayValue.toString();
         this.newArray = arrayStrings.split(" ");
         this.tableTemplate.columns[i].filter.arrayValue = this.newArray
        console.log("arraystrings", this.newArray)
        console.log("Valor", this.tableTemplate.columns[i].filter.arrayValue )
      }  
   }
  } */

  public onClear(): void {
    this.tableTemplate.columns.forEach((tableColumn) => {
      this.clearFilter(tableColumn);
    });
    this.countFilters();
    this.search.emit(this.tableTemplate.columns);
    if (!this.keepOpened) {
      this.panel.close();
    }
  }


  public initOperators(): void {
    this.operators = [];
    forkJoin([
      this.translateService.get("todos"),
      this.translateService.get("contiene"),
      this.translateService.get("igual"),
      this.translateService.get("distinto"),
      this.translateService.get("mayor"),
      this.translateService.get("mayor-igual"),
      this.translateService.get("menor"),
      this.translateService.get("menor-igual"),
      this.translateService.get("no-contiene"),
      this.translateService.get("vacio"),
      this.translateService.get("no-vacio"),
      this.translateService.get("entre"),
    ]).subscribe((translations) => {
      
      this.operators.push(
        new FilterOperator({ id: ColumnFilter.TODOS, name: translations[0] })
      );
      this.operators.push(
        new FilterOperator({ id: ColumnFilter.CONTIENE, name: translations[1] })
      );
      this.operators.push(
        new FilterOperator({ id: ColumnFilter.IGUAL, name: translations[2] })
      );
      this.operators.push(
        new FilterOperator({ id: ColumnFilter.DISTINTO, name: translations[3] })
      );
      this.operators.push(
        new FilterOperator({ id: ColumnFilter.MAYOR, name: translations[4] })
      );
      this.operators.push(
        new FilterOperator({
          id: ColumnFilter.MAYOR_IGUAL,
          name: translations[5],
        })
      );
      this.operators.push(
        new FilterOperator({ id: ColumnFilter.MENOR, name: translations[6] })
      );
      this.operators.push(
        new FilterOperator({
          id: ColumnFilter.MENOR_IGUAL,
          name: translations[7],
        })
      );
      this.operators.push(
        new FilterOperator({
          id: ColumnFilter.NO_CONTIENE,
          name: translations[8],
        })
      );
      this.operators.push(
        new FilterOperator({ id: ColumnFilter.VACIO, name: translations[9] })
      );
      this.operators.push(
        new FilterOperator({
          id: ColumnFilter.NO_VACIO,
          name: translations[10],
        })
      );
      this.operators.push(
        new FilterOperator({ id: ColumnFilter.ENTRE, name: translations[11] })
      );

      this.operators.push(
        new FilterOperator({ id:ColumnFilter.EN, name: "Multiples Valores"})
      )
    });
  }

  private initFilters(): void {
    this.tableTemplate.columns = sortBy(
      this.tableTemplate.columns,
      (tableColumn) => {
        return tableColumn.filterPosition;
        
      }
      );
      this.tableTemplate.columns.forEach((tableColumn) => {
        if (!tableColumn.column) {
          return;
        }
        if (!tableColumn.filter) {
          this.clearFilter(tableColumn);
          return;
        }
        const metadataValue = this.getMetadataValue(tableColumn);  
        
        if (metadataValue && tableColumn.filter.value) {
          
          if (
            metadataValue.component ===
            GefcoFiltersComponent.COMPONENT_AUTOCOMPLETE
            ) { 
              metadataValue.item = {
                id: tableColumn.filter.value,
                description: null,
              };
              metadataValue.filter = this.displayMetadataItem(metadataValue.item);
              if (metadataValue.filterCallback) {
                metadataValue
                .filterCallback(metadataValue.filter)
                .subscribe((items) => {
                  metadataValue.items = items;
                  metadataValue.items.forEach((metadataItem) => {
                    if (
                      this.compareMetadataItem(metadataValue.item, metadataItem)
                      ) {
                        metadataValue.item = metadataItem;
                        metadataValue.filter = this.displayMetadataItem(
                          metadataValue.item
                    );
                  }
                });
              });
            }
          } else if (
            metadataValue.component === GefcoFiltersComponent.COMPONENT_SELECT
            ) {
              metadataValue.item = {
                id: tableColumn.filter.value,
                description: null,
              };
              if (metadataValue.selectCallback) {
                metadataValue.selectCallback(metadataValue.item);
              }
            }
          }
          
          
          tableColumn.filter.arrayInputs.push(tableColumn.gridPosition)
          
    });
  }

  private countFilters(): void {
    this.filtersCount = 0;
    this.tableTemplate.columns.forEach((tableColumn) => {
      if (
        tableColumn.filter &&
        ((tableColumn.filter.operator !== ColumnFilter.TODOS &&
          tableColumn.filter.value) ||
          tableColumn.filter.operator === ColumnFilter.VACIO ||
          tableColumn.filter.operator === ColumnFilter.NO_VACIO)
      ) {
        this.filtersCount += 1;
      }
      
    });
  }

  private clearFilter(tableColumn: TableColumn): void {
    if (tableColumn.attribute == "activo") {
      tableColumn.filter = new ColumnFilter({
        operator: ColumnFilter.IGUAL,
        value: true,
      });
    } else {
      tableColumn.filter = new ColumnFilter({ operator: ColumnFilter.TODOS });
      const metadataValue = this.getMetadataValue(tableColumn);
      if (metadataValue) {
        metadataValue.item = null;
        metadataValue.filter = null;
        if (
          metadataValue.component ===
          GefcoFiltersComponent.COMPONENT_AUTOCOMPLETE
        ) {
          metadataValue.items = null;
        }
      }
    }
  }
  
  addValor(tableName: TableColumn){
  
    for (let i = 0 ; i< this.tableTemplate.columns.length; i++) {
      if(this.tableTemplate.columns[i].gridPosition === tableName.gridPosition){
        this.tableTemplate.columns[i].filter.arrayInputs.push(tableName.gridPosition);
      }
    } 
  }

  quitarImput(tableName : TableColumn, indice: number) {  
     for (let i = 0 ;i < this.tableTemplate.columns.length; i++ ){
      if(this.tableTemplate.columns[i].gridPosition === tableName.gridPosition){
          this.tableTemplate.columns[i].filter.arrayInputs.splice(indice, 1)
          this.tableTemplate.columns[i].filter.arrayValue.splice(indice+1, 1)
        }
      }
    }        
}



