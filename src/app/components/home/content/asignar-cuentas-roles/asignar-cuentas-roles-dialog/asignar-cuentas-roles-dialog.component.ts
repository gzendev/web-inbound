import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatAutocompleteSelectedEvent, MatDialogRef} from '@angular/material';
import {Observable, of, concat} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {CommonRestService} from '@services/common-rest.service';
import {AlertService} from '@services/alert.service';
import {RestService} from '@services/rest.service';
import {Constants} from '@utils/constants';
import {Helpers} from '@utils/helpers';
import {Cuenta} from '@models/cuenta.model';
import {Rol} from '@models/rol.model';
import {Sistema} from '@models/sistema.model';
import {Usuario} from '@models/usuario.model';
import {UsuarioCuenta} from '@models/usuario-cuenta.model';

@Component({
  selector: 'app-asignar-cuentas-roles-dialog',
  templateUrl: './asignar-cuentas-roles-dialog.component.html',
})
export class AsignarCuentasRolesDialogComponent implements OnInit {

  public usuario: Usuario;
  public usuarioToCopy: Usuario;
  public usuariosToCopy: Usuario[];
  public usuarioToCopyText: string;
  public sistema: Sistema;
  public sistemaToCopy: Sistema;
  public sistemas: Sistema[];
  public availableCuentas: Cuenta[] = [];
  public selectedCuentas: Cuenta[] = [];
  public availableRoles: Rol[] = [];
  public selectedRoles: Rol[] = [];
  public trackById = Helpers.trackById;
  public compareId = Helpers.compareId;
  public displayFullDescription = Helpers.displayFullDescription;
  public copyCuentas = false;
  public copyRoles = false;
  public viewing: boolean;
  public loading = true;

  constructor(private alertService: AlertService, private restService: RestService, private commonRestService: CommonRestService, private dialogRef: MatDialogRef<AsignarCuentasRolesDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) {

  }

  public ngOnInit(): void {
    this.viewing = this.dialogData && this.dialogData.viewing;
    this.usuario = new Usuario({id: this.dialogData.usuarioId});
    concat(this.loadCuentas(), this.loadSistemas()).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    }, () => {
      this.loading = false;
    });
  }

  public onSistemaSelected(): void {
    this.loadRoles().subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onUsuarioToCopyChanged(): void {
    this.commonRestService.find(Constants.USUARIO_PATH, {text: this.usuarioToCopyText}).subscribe((usuariosData) => {
      this.usuariosToCopy = usuariosData.map((usuarioData) => {
        return new Usuario(usuarioData);
      });
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public onUsuarioToCopySelected(event: MatAutocompleteSelectedEvent): void {
    this.usuarioToCopy = new Usuario(event.option.value);
  }

  public copyPermissions(): void {
    this.restService.save(Constants.SEGURIDAD_USUARIO_COPY_PATH, this.selectedCuentas, {
      sistemaId: this.sistema.id,
      usuarioOrigenId: this.usuarioToCopy.id,
      usuarioDestinoId: this.usuario.id,
      copyCuentas: this.copyCuentas,
      copyRoles: this.copyRoles,
    }).subscribe(() => {
      this.alertService.success(Constants.EXITO);
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public saveCuentas(): void {
    this.restService.save(Constants.USUARIO_CUENTA_ASSIGN_PATH, this.selectedCuentas, {usuarioId: this.usuario.id}).subscribe(() => {
      this.alertService.success(Constants.EXITO);
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public saveRoles(): void {
    this.commonRestService.save(Constants.ROL_ASSIGN_PATH, this.selectedRoles, {sistemaId: this.sistema.id, usuarioId: this.usuario.id}).subscribe(() => {
      this.alertService.success(Constants.EXITO);
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  private loadSistemas(): Observable<void> {
    return this.commonRestService.getAll(Constants.SISTEMA_PATH).pipe(
      mergeMap((sistemasData) => {
        this.sistemas = sistemasData.map((sistemaData) => {
          return new Sistema(sistemaData);
        });
        if (this.sistemas.length > 0) {
          this.sistema = this.sistemas[0];
          return this.loadRoles().pipe(mergeMap(() => of(null)));
        }
        return of(null);
      })
    );
  }

  private loadCuentas(): Observable<void> {
    let cuentas: Cuenta[] = [];
    return this.commonRestService.getAll(Constants.CUENTA_PATH).pipe(
      mergeMap((cuentasData) => {
        cuentas = cuentasData.map((cuentaData) => {
          return new Cuenta(cuentaData);
        });
        return this.restService.find(Constants.USUARIO_CUENTA_PATH, {usuarioId: this.usuario.id});
      }),
      mergeMap((usuariosCuentasData) => {
        const usuariosCuentas = usuariosCuentasData.map((usuarioCuentaData) => {
          return new UsuarioCuenta(usuarioCuentaData);
        });
        this.availableCuentas = [];
        this.selectedCuentas = [];
        cuentas.forEach((cuenta) => {
          const assignedCuenta = usuariosCuentas.find((usuarioCuenta) => {
            return usuarioCuenta.cuenta.id === cuenta.id;
          });
          if (assignedCuenta) {
            this.selectedCuentas.push(cuenta);
          } else {
            this.availableCuentas.push(cuenta);
          }
        });
        return of(null);
      })
    );
  }

  private loadRoles(): Observable<void> {
    let roles: Rol[] = [];
    return this.commonRestService.find(Constants.ROL_PATH, {sistemaId: this.sistema.id}).pipe(
      mergeMap((rolesData) => {
        roles = rolesData.map((cuentaData) => {
          return new Rol(cuentaData);
        });
        return this.commonRestService.find(Constants.ROL_PATH, {sistemaId: this.sistema.id, usuarioId: this.usuario.id});
      }),
      mergeMap((assignedRolesData) => {
        const assignedRoles = assignedRolesData.map((assignedRolData) => {
          return new Rol(assignedRolData);
        });
        this.availableRoles = [];
        this.selectedRoles = [];
        roles.forEach((rol) => {
          const selectedRol = assignedRoles.find((assignedRol) => {
            return assignedRol.id === rol.id;
          });
          if (selectedRol) {
            this.selectedRoles.push(rol);
          } else {
            this.availableRoles.push(rol);
          }
        });
        return of(null);
      })
    );
  }
}
