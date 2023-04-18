import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {RolDialogComponent} from './rol-dialog/rol-dialog.component';
import {PermisosRolComponent} from './permisos-rol/permisos-rol.component';
import {BaseCrudComponent} from '@components/home/content/base-crud.component';
import {RowActionEvent} from '@components/gefco/gefco-table/gefco-table.component';

import {CommonRestService} from '@services/common-rest.service';
import {CommonTableService} from '@services/common-table.service';
import {AlertService} from '@services/alert.service';
import {RestService} from '@services/rest.service';
import {Constants} from '@utils/constants';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent extends BaseCrudComponent implements OnInit {

  @ViewChild('permisosRol')
  private permisosRol: PermisosRolComponent;

  constructor(protected alertService: AlertService, protected restService: RestService, protected commonRestService: CommonRestService, protected tableService: CommonTableService, protected router: Router, private dialog: MatDialog) {
    super(alertService, restService, commonRestService, tableService, router);
    this.breadcrumb = [
      Constants.DATOS_COMUNES_BREADCRUMB,
      Constants.SEGURIDAD_BREADCRUMB,
      Constants.MANTENER_ROLES_BREADCRUMB,
    ];
  }

  public ngOnInit(): void {
    super.init().subscribe(() => {
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onSelectRow(row: any): void {
    this.permisosRol.loadRol(row).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onDeleteRow(event: RowActionEvent): void {
    this.commonRestService.delete(Constants.ROL_PATH, {id: event.row.id}).pipe(
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
      rolId: row.id,
    } : null;
    const dialogRef = this.dialog.open(RolDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(
      mergeMap(() => {
        return this.loadRows();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      if (err.error) {
        this.alertService.danger(err);
      } else {
        this.alertService.danger(err);
      }
    });
  }

  protected getCrudName(): string {
    return Constants.ROL_PATH;
  }

  protected getFunctionId(): string {
    return Constants.ROL_FUNCTION_ID;
  }

  protected loadFiltersMetadata(): Observable<void> {
    return of(null);
  }
}
