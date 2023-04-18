import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BocaEntrega } from "@app/models/bocaEntrega.model";
import { Concesionario, ConcesionariosEmail } from "@app/models/concesionariosEmail.model";
import { ResponseBase } from "@app/models/response-base.model";
import { ResponseData } from "@app/models/response-data.model";
import { RequestUtils } from "@app/utils/request.utils";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class ConfigurationEmailService{
    
    constructor(private httpClient: HttpClient) {

    }

    public getConcesionariosEmails(): Observable<ResponseData<ConcesionariosEmail[]>>{
        const httpUrl = RequestUtils.getSysApiUrl('/concesionario/find');
        const httpOptions = RequestUtils.getJsonOptions();
        return this.httpClient.get<ResponseData<ConcesionariosEmail[]>>(httpUrl, httpOptions).pipe(
          map((data: ResponseData<ConcesionariosEmail[]>) => {
            return data;
          })
        );
      }

      public changeConcesionarioEmail(emailChange: Concesionario): Observable<ResponseBase>{
        const httpUrl = RequestUtils.getSysApiUrl('/concesionario/emailChange');
        const httpOptions = RequestUtils.getJsonOptions();
        return this.httpClient.post<ResponseData<ResponseBase>>(httpUrl, emailChange, httpOptions).pipe(
          map((data: ResponseData<ResponseBase>) => {
            const passrec = new ResponseBase(data.response);
            return passrec;
          })
        );
      }


      public getBocasEmails(codigoPais:string, codigoCliente:string,codigoConcesionario: string): Observable<ResponseData<BocaEntrega[]>>{
        const httpUrl = RequestUtils.getSysApiUrl('/boca-entrega/findByConcesionaria');
        const httpOptions = RequestUtils.getJsonOptions();
        let httpParams = new HttpParams();
        httpParams = httpParams.set("codigoPais", codigoPais);
        httpParams = httpParams.set("codigoCliente", codigoCliente);
        httpParams = httpParams.set("codigoConcesionario", codigoConcesionario);
        httpOptions.params = httpParams;
        return this.httpClient.get<ResponseData<BocaEntrega[]>>(httpUrl, httpOptions).pipe(
          map((data: ResponseData<BocaEntrega[]>) => {
            console.log(data);
            return data;
          })
        );
      }

      public changeBocaEmail(emailChange: BocaEntrega): Observable<ResponseBase>{
        const httpUrl = RequestUtils.getSysApiUrl('/boca-entrega/emailChange');
        const httpOptions = RequestUtils.getJsonOptions();
        return this.httpClient.post<ResponseData<ResponseBase>>(httpUrl, emailChange, httpOptions).pipe(
          map((data: ResponseData<ResponseBase>) => {
            const passrec = new ResponseBase(data.response);
            return passrec;
          })
        );
      }
}