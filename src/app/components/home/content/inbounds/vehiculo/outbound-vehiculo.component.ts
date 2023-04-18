import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, forkJoin } from "rxjs";

import { BaseCrudComponent } from "@components/home/content/base-crud.component";

import { CommonRestService } from "@services/common-rest.service";
import { TableService } from "@services/table.service";
import { AlertService } from "@services/alert.service";
import { RestService } from "@services/rest.service";
import { Constants } from "@utils/constants";
import { mergeMap } from "rxjs/operators";
import { environment } from "@envs/environment";
import { ColumnFilter } from "@app/models/column-filter.model";
import { MapInfo } from "@app/models/map-info.model";

@Component({
  selector: "app-inbounds",
  templateUrl: "./outbound-vehiculo.component.html",
})
export class OutboundVehiculosComponent
  extends BaseCrudComponent
  implements OnInit {
  public hasGestionGefcoOvs: boolean;
  public hasGestionPuertoAeropuerto: boolean;
  public hasGestionGefcoIjda: boolean;
  public hasGestionIjda: boolean;
  public hasGestionDespachantes: boolean;
  public hasAlmacenRepuestosIjda: boolean;
  public showMenu: boolean = false;
  public showEditAll: boolean;
  public mapa:MapInfo;

  constructor(
    protected alertService: AlertService,
    protected restService: RestService,
    protected commonRestService: CommonRestService,
    protected tableService: TableService,
    protected router: Router
  ) {
    super(alertService, restService, commonRestService, tableService, router);
    this.breadcrumb = [
      Constants.PROCESS_LOGISTICS_BREADCRUMB,
      Constants.INBOUND_VEHICULO_BREADCRUMB,
    ];
    this.mapa = new MapInfo();
  }

  public ngOnInit(): void {
    var estados = [
      { id: "Liberado", description: "Liberado" },
      { id: "En preparacion", description: "En preparacion" },
      { id: "En Transito", description: "En Transito" },
      { id: "Entregado", description: "Entregado" },
      {
        id: "Consultar a la operacion",
        description: "Consultar a la operación",
      },
    ];

    

    this.filtersMetadata.vin = {
      component: "text",
      onlyOperators : [ColumnFilter.IGUAL] 
    };

    const estadoActualValue = localStorage.getItem('EstadoActual');

    this.filtersMetadata.estadoActual = {
      component: "select",
      item: {id: estadoActualValue, description: estadoActualValue},
      items: estados,
      placeholder: "seleccione-estado-actual",
    };

  
    this.useLocationFiltersMetadata();
    super
      .init()
      .pipe(
        mergeMap(() => {
          return this.showEditGestionMenus();
        })
      )
      .subscribe(
        () => {
          this.loading = false;
        },
        (err) => {
          this.alertService.danger(err);
        }
      );
  }

  protected getCrudName(): string {
    return Constants.INBOUND_VEHICULO_PATH;
  }

  protected getFunctionId(): string {
    return Constants.OUTBOUND_VEHICULO_FUNCTION_ID;
  }

  protected loadFiltersMetadata(): Observable<void> {
    return of(null);
  }
  
  public onViewRow(row: any): void {
    this.currentTemplate.columns.find(
      (element) => element.name == Constants.INBOUND_FILTER_ID_PIEZA
    ).filter = new ColumnFilter(this.idsPiezaToArray(row));
    this.currentTemplate.columns.find(
      (element) => element.name == Constants.INBOUND_FILTER_ID_VIAJE
    ).filter = new ColumnFilter(this.idsToArray(row));
    this.router.navigate(
      [Constants.INBOUND_VEHICULOS_BREADCRUMB.url, row.id, "view"],
      { state: { filtros: this.currentTemplate.columns } }
    );
  }

  public onMapRow(row: any): void {
    if(row && row.estadoActual === "En Transito") {
      this.router.navigate(
        [Constants.INBOUND_VEHICULOS_BREADCRUMB.url, row.vin , "map",row.datoSeguimiento],
      )
    } else {
      let errorMessage: string = "No se puede mostrar la ubicacion ya que el VIN no se encuentra en transito";
        this.alertService.danger(errorMessage);
    }
  }

  private showEditGestionMenus(): Observable<void> {
    return forkJoin(
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {
        functionId: Constants.INBOUND_GESTION_IJDA.function,
        sistemaId: environment.sistemaId,
      })
    ).pipe(
      mergeMap((permissions) => {
        this.hasGestionIjda = !permissions[0].denied;
        this.showMenu = this.hasGestionIjda;
        this.showEditAll = true;
        return of(null);
      })
    );
  }

  public inboundIjda(row: any, action: string): void {
    this.currentTemplate.columns.find(
      (element) => element.name == Constants.INBOUND_FILTER_ID_VEHICULO
    ).filter = new ColumnFilter(this.idsPiezaToArray(row));
    if (row == null || row.length > 0) {
      this.currentTemplate.columns.find(
        (element) => element.name == Constants.INBOUND_FILTER_ID_VEHICULO
      ).filter = new ColumnFilter(this.idsToArray(row));
      this.router.navigate(
        [
          Constants.INBOUND_VEHICULO_BREADCRUMB.url,
          Constants.INBOUND_MULTIPLE,
          Constants.INBOUND_GESTION_IJDA.id,
          action,
        ],
        { state: { filtros: this.currentTemplate.columns } }
      );
    } else {
      this.currentTemplate.columns.find(
        (element) => element.name == Constants.INBOUND_FILTER_ID_VEHICULO
      ).filter = new ColumnFilter(this.idsToArray(row));
      this.router.navigate(
        [
          Constants.INBOUND_VEHICULO_BREADCRUMB.url,
          row.idPieza,
          Constants.INBOUND_GESTION_IJDA.id,
          action,
        ],
        { state: { filtros: this.currentTemplate.columns } }
      );
    }
  }

  private idsPiezaToArray(list: any): any {
    let ids: String[] = [];
    let ret;
    if (!list) return (ret = { operator: "TODOS", value: ids, otherValue: "" });

    if (!(list.length > 0)) {
      ids.push(list.idPieza);
      return (ret = { operator: "EN", value: ids, otherValue: "" });
    }

    list.forEach(function (value: any) {
      ids.push(value.idPieza);
    });
    ret = { operator: "EN", value: ids, otherValue: "" };
    return ret;
  }

  private idsToArray(list: any): any {
    let ids: String[] = [];
    let ret;
    if (!list) return (ret = { operator: "TODOS", value: ids, otherValue: "" });

    if (!(list.length > 0)) {
      ids.push(list.id);
      return (ret = { operator: "EN", value: ids, otherValue: "" });
    }

    list.forEach(function (value: any) {
      ids.push(value.id);
    });
    ret = { operator: "EN", value: ids, otherValue: "" };
    return ret;
  }

  public reloadComponent() {
    this.ngOnInit();
  }
}
