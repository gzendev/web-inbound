import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, of } from "rxjs";

import { BaseCrudComponent } from "@components/home/content/base-crud.component";

import { CommonRestService } from "@services/common-rest.service";
import { TableService } from "@services/table.service";
import { AlertService } from "@services/alert.service";
import { RestService } from "@services/rest.service";
import { Constants } from "@utils/constants";
import { ColumnFilter } from "@app/models/column-filter.model";
import { InboundService } from "@app/services/inbound.service";
import { MapInfo } from "@app/models/map-info.model";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: "app-inbounds",
  templateUrl: "outbound-vehiculo-map.component.html",
  styleUrls:["outbound-vehiculo-map.component.css"]
})
export class OutboundVehiculosMapComponent
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
  public urlSafe: SafeResourceUrl;

  constructor(
    protected alertService: AlertService,
    protected restService: RestService,
    protected commonRestService: CommonRestService,
    protected tableService: TableService,
    protected router: Router,
    private activeRoute: ActivatedRoute,
    private inboundService : InboundService,
    public sanitizer: DomSanitizer
  ) {
    super(alertService, restService, commonRestService, tableService, router);
    this.breadcrumb = [
      Constants.PROCESS_LOGISTICS_BREADCRUMB,
      Constants.INBOUND_VEHICULO_BREADCRUMB,
      Constants.INBOUND_VEHICULO_MAP_BREADCRUMB,
    ];
    this.mapa = new MapInfo();
  }

  public ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.inboundService.getMapInfo(params.get("vin"),params.get("hojaRuta")).subscribe(data=>{
        this.mapa = new MapInfo(data);
        let validator = "https";
        let validUrl = this.mapa.url.slice(0, 5);
        if(this.mapa.ultimaLectura === '') {
          this.mapa.ultimaLectura = "Sin ultima Lectura";
        }
        if(this.mapa.url != '' && validUrl === validator) {
          this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.mapa.url);
        } else {
          this.mapa.url = '';
        }
        this.loading = false;
      });
    }, err => {
      this.alertService.danger(err.message);
    });
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
}
