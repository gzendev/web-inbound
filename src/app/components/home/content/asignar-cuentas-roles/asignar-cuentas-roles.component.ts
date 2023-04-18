import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {AsignarCuentasRolesDialogComponent} from './asignar-cuentas-roles-dialog/asignar-cuentas-roles-dialog.component';
import {BaseCrudComponent} from '@components/home/content/base-crud.component';
import {RowActionEvent} from '@components/gefco/gefco-table/gefco-table.component';

import {RestService} from '@services/rest.service';
import {TableService} from '@services/table.service';
import {Constants} from '@utils/constants';
import {CommonRestService} from '@services/common-rest.service';
import {AlertService} from '@services/alert.service';

@Component({
  selector: 'app-asignar-cuentas-roles',
  templateUrl: './asignar-cuentas-roles.component.html',
})
export class AsignarCuentasRolesComponent extends BaseCrudComponent implements OnInit {

  constructor(protected alertService: AlertService, protected restService: RestService, protected commonRestService: CommonRestService, protected tableService: TableService, protected router: Router, private dialog: MatDialog) {
    super(alertService, restService, commonRestService, tableService, router);
    this.breadcrumb = [
      Constants.DATOS_COMUNES_BREADCRUMB,
      Constants.SEGURIDAD_BREADCRUMB,
      Constants.ASIGNAR_CUENTAS_ROLES_BREADCRUMB,
    ];
  }

  public ngOnInit(): void {
    super.init().subscribe(() => {
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onDeleteRow(event: RowActionEvent): void {
    this.restService.delete(Constants.USUARIO_CUENTA_PATH, {
      usuarioId: event.row.usuario,
      cuentaId: event.row.cuenta,
    }).pipe(
      mergeMap(() => {
        event.observer.next(false);
        return this.loadRows();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public openDialog(row?: any, viewing?: boolean): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    dialogConfig.data = row ? {
      viewing,
      usuarioId: row.id,
    } : null;
    const dialogRef = this.dialog.open(AsignarCuentasRolesDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(
      mergeMap(() => {
        return this.loadRows();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  protected getCrudName(): string {
    return Constants.SEGURIDAD_USUARIO_PATH;
  }

  protected getFunctionId(): string {
    return Constants.SEGURIDAD_FUNCTION_ID;
  }

  protected loadFiltersMetadata(): Observable<void> {
    return this.commonRestService.getAll(Constants.PAIS_PATH).pipe(
      mergeMap((paisesData) => {
        this.filtersMetadata.pais = {component: 'select', items: this.createMetadataItems(paisesData)};
        return of(null);
      })
    );
  }
}
