import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';

import {AlertService} from '@services/alert.service';
import {CommonRestService} from '@services/common-rest.service';
import {Constants} from '@utils/constants';
import {Codigo} from '@models/codigo.model';
import {Rol} from '@models/rol.model';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-permisos-rol',
  templateUrl: './permisos-rol.component.html',
})
export class PermisosRolComponent implements OnInit {

  public funcionesBasicas: TreeNode[];
  public funcionesBasicasRespaldo: any[];
  public funcionesSeleccionadasRespaldo: any[];
  public funcionesSeleccionadas: TreeNode[];
  public sistemas: Codigo[];
  public sistema: Codigo;
  public rol: Rol;
  public viewing: boolean;

  constructor(protected alertService: AlertService, protected restService: CommonRestService) {

  }

  public ngOnInit(): void {
    this.restService.getAll(Constants.SISTEMA_PATH).subscribe((sistemasData) => {
      this.sistemas = sistemasData.map((sistemaData) => {
        return new Codigo(sistemaData);
      });
    });
  }

  public onSistemaChanged(): void {
    this.restService.getAll(Constants.FUNCIONES_PATH, {sistemaId: this.sistema.id}).pipe(
      mergeMap((funcionesData) => {
        this.funcionesBasicasRespaldo = funcionesData;
        return this.loadUsuarioFunciones();
      })
    ).subscribe(() => {
      // Nothing to do...
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public loadRol(rol: Rol): Observable<void> {
    this.rol = new Rol(rol);
    return this.loadUsuarioFunciones();
  }

  public saveFunciones(): void {
    const funciones: any[] = [];
    this.funcionesSeleccionadas.forEach((funcion) => {
      funciones.push(funcion.data);
    });
    this.restService.save(Constants.SECURITY_PERMISSION_PATH, funciones, {sistemaId: this.sistema.id, usuarioId: this.rol.id}).subscribe(() => {
      this.alertService.success('Exito');
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  private loadUsuarioFunciones(): Observable<void> {
    if (!this.sistema || !this.rol) {
      return of(null);
    }
    return this.restService.getList(Constants.SECURITY_PERMISSIONS_PATH, {sistemaId: this.sistema.id, usuarioId: this.rol.id}).pipe(
      mergeMap((funcionesData) => {
        this.funcionesSeleccionadas = [];
        this.funcionesSeleccionadasRespaldo = funcionesData;
        this.funcionesBasicas = this.convertNodes(this.funcionesBasicasRespaldo);
        return of(null);
      })
    );
  }

  private convertNode(funcion: any): TreeNode {
    return {label: funcion.descripcion, data: funcion.id};
  }

  private convertNodes(funciones: any[]): any[] {
    const nodes: any[] = [];
    funciones.forEach((funcion) => {
      const node = this.convertNode(funcion);
      nodes.push(node);
      if (this.funcionesSeleccionadasRespaldo) {
        this.funcionesSeleccionadasRespaldo.forEach((funcionSeleccionadaRespaldo) => {
          if (funcionSeleccionadaRespaldo === node.data) {
            this.funcionesSeleccionadas.push(node);
          }
        });
      }
      if (funcion.children) {
        node.children = this.convertNodes(funcion.children);
      }
    });
    return nodes;
  }
}
