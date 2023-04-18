import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Inbound } from "@app/models/inbound.model";
import { RequestUtils } from "@utils/request.utils";
import { ResponseData } from "@models/response-data.model";
import { Constants } from "@app/utils/constants";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { InboundGestion } from "@app/models/inbound-gestion.model";
import { StorageUtils } from "@utils/storage.utils";
import { TokenUser } from "@models/token-user.model";
import { TableColumn } from "@models/table-column.model";
import { MapInfo } from "@app/models/map-info.model";

@Injectable()
export class InboundService {
  constructor(private httpClient: HttpClient) {}

  public getGestion(gestion: string): InboundGestion {
    for (
      let index = 0;
      index < Constants.INBOUND_GESTION_LIST.length;
      index++
    ) {
      if (Constants.INBOUND_GESTION_LIST[index].id == gestion) {
        return Constants.INBOUND_GESTION_LIST[index];
      }
    }
    return null;
  }

  public updateByGestion(
    filters: TableColumn[],
    gestion: string,
    inbound: Inbound,
    tipoInbound: string
  ): Observable<Inbound> {
    if (this.getGestion(gestion) == null) {
      return null;
    }
    let ret = { filtros: filters, inbound: inbound };
    const httpUrl = RequestUtils.getSysApiUrl(tipoInbound + gestion);
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient
      .put<ResponseData<Inbound>>(httpUrl, ret, httpOptions)
      .pipe(map((data: ResponseData<Inbound>) => new Inbound(data.response)));
  }

  public getComJdCompradorList(): Observable<any[]> {
    const httpUrl = RequestUtils.getSysApiUrl("/inbound/comJdComprador");
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient
      .get<ResponseData<any>>(httpUrl, httpOptions)
      .pipe(map((data: ResponseData<any>) => data.response));
  }

  public getGefRoTerminalList(): Observable<any[]> {
    const httpUrl = RequestUtils.getSysApiUrl("/inbound/gefRoTerminal");
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient
      .get<ResponseData<any>>(httpUrl, httpOptions)
      .pipe(map((data: ResponseData<any>) => data.response));
  }

  public getGefRoDespachanteList(): Observable<any[]> {
    const httpUrl = RequestUtils.getSysApiUrl("/inbound/gefRoDespachante");
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient
      .get<ResponseData<any>>(httpUrl, httpOptions)
      .pipe(map((data: ResponseData<any>) => data.response));
  }

  public getGefRoTipoCntList(): Observable<any[]> {
    const httpUrl = RequestUtils.getSysApiUrl("/inbound/gefRoTipoCnt");
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient
      .get<ResponseData<any>>(httpUrl, httpOptions)
      .pipe(map((data: ResponseData<any>) => data.response));
  }

  public getGefRoUOList(): Observable<any[]> {
    const httpUrl = RequestUtils.getSysApiUrl("/inbound/gefRoUO");
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient
      .get<ResponseData<any>>(httpUrl, httpOptions)
      .pipe(map((data: ResponseData<any>) => data.response));
  }

  public getMultiple(path: string, columns: TableColumn[]): Observable<any[]> {
    const httpUrl = RequestUtils.getSysApiUrl(`/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient
      .post<ResponseData<any[]>>(httpUrl, columns, httpOptions)
      .pipe(map((data: ResponseData<any[]>) => data.response));
  }

  public getComJdAudtCritico(): string {
    let user: TokenUser = StorageUtils.getDecodedToken();
    return user.nombre + " " + user.apellido;
  }

  public getMapInfo(vin: string, hojaRuta: string): Observable<MapInfo> {
    const httpUrl = RequestUtils.getSysApiUrl("/inboundVehiculo/map");
    const httpOptions = RequestUtils.getJsonOptions();
    let httpParams = new HttpParams();
    httpParams = httpParams.set("vin", vin);
    httpParams = httpParams.set("hojaRuta", hojaRuta);
    httpOptions.params = httpParams;
    return this.httpClient
      .get<ResponseData<MapInfo>>(httpUrl, httpOptions)
      .pipe(map((data: ResponseData<MapInfo>) => data.response));
      
  }
}
