import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {CommonRestService} from '@services/common-rest.service';
import {AlertService} from '@services/alert.service';
import {Constants} from '@utils/constants';
import {Rol} from '@models/rol.model';

@Component({
  selector: 'app-rol-dialog',
  templateUrl: './rol-dialog.component.html',
})
export class RolDialogComponent implements OnInit {

  public rol: Rol;
  public viewing: boolean;
  public loading = true;

  constructor(private alertService: AlertService, private restService: CommonRestService, private dialogRef: MatDialogRef<RolDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) {

  }

  public ngOnInit(): void {
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.loadRol().subscribe(() => {
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public createRol(): void {
    this.restService.save(Constants.ROL_PATH, this.rol).subscribe(() => {
      this.alertService.success(Constants.EXITO);
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  private loadRol(): Observable<void> {
    if (!this.dialogData) {
      this.rol = new Rol({activo: true});
      return of(null);
    }
    return this.restService.get(Constants.ROL_PATH, {id: this.dialogData.rolId}).pipe(
      mergeMap((rolData) => {
        this.rol = new Rol(rolData);
        return of(null);
      })
    );
  }
}
