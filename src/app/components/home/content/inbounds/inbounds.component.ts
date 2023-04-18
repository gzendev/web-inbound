import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, forkJoin} from 'rxjs';

import {BaseCrudComponent} from '@components/home/content/base-crud.component';

import {CommonRestService} from '@services/common-rest.service';
import {TableService} from '@services/table.service';
import {AlertService} from '@services/alert.service';
import {RestService} from '@services/rest.service';
import {Constants} from '@utils/constants';
import { mergeMap } from 'rxjs/operators';
import {environment} from '@envs/environment';
import { ColumnFilter } from '@app/models/column-filter.model';

@Component({
  selector: 'app-inbounds',
  templateUrl: './inbounds.component.html',
})
export class InboundsComponent extends BaseCrudComponent implements  OnInit {

  public hasGestionGefcoOvs: boolean; 
  public hasGestionPuertoAeropuerto: boolean; 
  public hasGestionGefcoIjda: boolean; 
  public hasGestionIjda: boolean; 
  public hasGestionDespachantes: boolean;
  public hasAlmacenRepuestosIjda: boolean; 
  public showMenu : boolean = false;
  public showEditAll : boolean = false;

  constructor(protected alertService: AlertService, protected restService: RestService, protected commonRestService: CommonRestService, protected tableService: TableService, protected router: Router) {
    super(alertService, restService, commonRestService, tableService, router);
    this.breadcrumb = [
      Constants.PROCESS_LOGISTICS_BREADCRUMB,
      Constants.INBOUNDS_BREADCRUMB
    ];
  }

  public ngOnInit(): void {
    console.log("viajes");
    this.useLocationFiltersMetadata();
    super.init().pipe(
      mergeMap(() => {
        return this.showEditGestionMenus();
      })
    ).subscribe(() => {
      this.loading = false;
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  protected getCrudName(): string {
    return Constants.INBOUND_PATH;
  }

  protected getFunctionId(): string {
    return Constants.INBOUND_FUNCTION_ID;
  }

  protected loadFiltersMetadata(): Observable<void> {
    return of(null);
  }

  public onViewRow(row: any): void {
    this.currentTemplate.columns.find(element => element.name == Constants.INBOUND_FILTER_ID).filter = new ColumnFilter(this.idsToArray(row));
    this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url, row.id, 'view'],{state: {filtros: this.currentTemplate.columns}});
  }

  private showEditGestionMenus(): Observable<void> {
    return forkJoin(
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: Constants.INBOUND_GESTION_GEFCO_OVS.function, sistemaId: environment.sistemaId}),
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: Constants.INBOUND_GESTION_PUERT_AEROPUERTO.function, sistemaId: environment.sistemaId}),
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: Constants.INBOUND_GESTION_GEFCO_IJDA.function, sistemaId: environment.sistemaId}),
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: Constants.INBOUND_GESTION_DESPACHANTES.function, sistemaId: environment.sistemaId}),
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: Constants.INBOUND_GESTION_ALMACEN_REPUESTOS_IJDA.function, sistemaId: environment.sistemaId}),
      this.commonRestService.get(Constants.CODIGO_FIND_PATH, {type: Constants.VIAJES_EDITAR_TODOS})
    ).pipe(
      mergeMap((permissions) => {
        this.hasGestionGefcoOvs = !permissions[0].denied;
        this.hasGestionPuertoAeropuerto = !permissions[1].denied;
        this.hasGestionGefcoIjda = !permissions[2].denied;
        this.hasGestionDespachantes = !permissions[3].denied;
        this.hasAlmacenRepuestosIjda = !permissions[4].denied;
        this.showEditAll = permissions[5][0].id == '1';
        this.showMenu =  this.hasGestionGefcoOvs || this.hasGestionPuertoAeropuerto || this.hasGestionGefcoIjda
          || this.hasGestionDespachantes || this.hasAlmacenRepuestosIjda;
        return of(null);
      })
    );
  }

  public inboundGefcoOvs(row: any, action: string): void {
    
      this.currentTemplate.columns.find(element => element.name == Constants.INBOUND_FILTER_ID).filter = new ColumnFilter(this.idsToArray(row));
    if (row == null || row.length > 0) {
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url,Constants.INBOUND_MULTIPLE, 
        Constants.INBOUND_GESTION_GEFCO_OVS.id, action],{state: {filtros: this.currentTemplate.columns}});
    }
    else
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url,row.id, Constants.INBOUND_GESTION_GEFCO_OVS.id, action],{state: {filtros: this.currentTemplate.columns}});
  }

  public inboundPuertoAeropuerto(row: any, action: string): void {
    this.currentTemplate.columns.find(element => element.name == Constants.INBOUND_FILTER_ID).filter = new ColumnFilter(this.idsToArray(row));
    if (row == null || row.length > 0) {
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url,Constants.INBOUND_MULTIPLE, 
        Constants.INBOUND_GESTION_PUERT_AEROPUERTO.id, action],{state: {filtros: this.currentTemplate.columns}});
    } 
    else
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url, row.id, Constants.INBOUND_GESTION_PUERT_AEROPUERTO.id, action],{state: {filtros: this.currentTemplate.columns}});
  }

  public inboundGefcoIjda(row: any, action: string): void {
    this.currentTemplate.columns.find(element => element.name == Constants.INBOUND_FILTER_ID).filter = new ColumnFilter(this.idsToArray(row));
    if (row == null || row.length > 0) {  
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url,Constants.INBOUND_MULTIPLE, 
        Constants.INBOUND_GESTION_GEFCO_IJDA.id, action],{state: {filtros: this.currentTemplate.columns}});
      }
      else
        this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url, row.id, Constants.INBOUND_GESTION_GEFCO_IJDA.id, action],{state: {filtros: this.currentTemplate.columns}});
  }

  public inboundIjda(row: any,action: string): void {
    this.currentTemplate.columns.find(element => element.name == Constants.INBOUND_FILTER_ID).filter = new ColumnFilter(this.idsToArray(row));
    if (row == null || row.length > 0) {
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url,Constants.INBOUND_MULTIPLE, 
        Constants.INBOUND_GESTION_IJDA.id, action],{state: {filtros: this.currentTemplate.columns}});
    }
    else
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url, row.id, Constants.INBOUND_GESTION_IJDA.id, action],{state: {filtros: this.currentTemplate.columns}});
  }

  public inboundDespachantes(row: any, action: string): void {
    this.currentTemplate.columns.find(element => element.name == Constants.INBOUND_FILTER_ID).filter = new ColumnFilter(this.idsToArray(row));
    if (row == null || row.length > 0) {
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url,Constants.INBOUND_MULTIPLE, 
        Constants.INBOUND_GESTION_DESPACHANTES.id, action],{state: {filtros: this.currentTemplate.columns}});
    }
    else
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url, row.id, Constants.INBOUND_GESTION_DESPACHANTES.id, action],{state: {filtros: this.currentTemplate.columns}});
  }

  public inboundAlmacenRepuestosIjda(row: any, action: string): void {
    this.currentTemplate.columns.find(element => element.name == Constants.INBOUND_FILTER_ID).filter = new ColumnFilter(this.idsToArray(row));
    if (row == null || row.length > 0) {
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url,Constants.INBOUND_MULTIPLE, 
        Constants.INBOUND_GESTION_ALMACEN_REPUESTOS_IJDA.id, action],{state: {filtros: this.currentTemplate.columns}});
    }
    else
      this.router.navigate([Constants.INBOUNDS_BREADCRUMB.url, row.id, Constants.INBOUND_GESTION_ALMACEN_REPUESTOS_IJDA.id, action],{state: {filtros: this.currentTemplate.columns}});
  }

  private idsToArray(list: any): any {
    let ids: String[] = [];
    let ret;
    if (!list)
      return ret={ operator : 'TODOS', value : ids, otherValue : "" };

    if (!(list.length > 0)){
      ids.push(list.id);
      return ret={ operator : 'EN', value : ids, otherValue : "" };
    }

    list.forEach(function (value: any) {
      ids.push(value.id);
    }); 
    ret={ operator : 'EN', value : ids, otherValue : "" }
    return ret;
  }
}
