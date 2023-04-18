import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import * as FileSaver from 'file-saver';

import {RequestUtils} from '@utils/request.utils';
import {Helpers} from '@utils/helpers';
import {ResponseData} from '@models/response-data.model';
import {TableColumn} from '@models/table-column.model';
import {TableTemplate} from '@models/table-template.model';
import {environment} from '@envs/environment';

interface KeyValue {
  [index: string]: any;
}

@Injectable()
export class TableService {

  constructor(private httpClient: HttpClient) {

  }

  public getNumberRows(crud: string, columns: TableColumn[]): Observable<number> {
    const httpUrl = this.getEndpoint(`/${crud}/table/getNumberRows`);
    // console.log(`/${crud}/table/getNumberRows`);
    // console.log(httpUrl);
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<ResponseData<number>>(httpUrl, columns, httpOptions).pipe(
      map((data: ResponseData<number>) => data.response)
    );
  }

  public getRows(crud: string, columns: TableColumn[]): Observable<any[]> {
    const httpUrl = this.getEndpoint(`/${crud}/table/getRows`);
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<ResponseData<any[]>>(httpUrl, columns, httpOptions).pipe(
      map((data: ResponseData<any[]>) => data.response)
    );
  }

  public getAuditRows(crud: string, params: KeyValue): Observable<any[]> {
    const httpUrl = this.getEndpoint(`/${crud}/table/getAuditRows`);
    const httpOptions = RequestUtils.getJsonOptions();
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, params[key]);
    });
    httpOptions.params = httpParams;
    return this.httpClient.get<ResponseData<any[]>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<any[]>) => data.response)
    );
  }

  public getExpandedRows(crud: string, params: KeyValue): Observable<any[]> {
    const httpUrl = this.getEndpoint(`/${crud}/table/getExpandedRows`);
    const httpOptions = RequestUtils.getJsonOptions();
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, params[key]);
    });
    httpOptions.params = httpParams;
    return this.httpClient.get<ResponseData<any[]>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<any[]>) => data.response)
    );
  }

  public exportRows(crud: string, columns: TableColumn[]): Observable<Blob> {
    const httpUrl = this.getEndpoint(`/${crud}/table/export`);
    const httpOptions = RequestUtils.getBlobOptions();
    this.httpClient.post<Blob>(httpUrl, columns, httpOptions).subscribe((data) => {
      const fileName =  `${crud}.xlsx`;
      FileSaver.saveAs(data, fileName);
    }, (err) => {
      console.log(err);
    });
    return of(null);
  }

  public getTemplates(crud: string): Observable<TableTemplate[]> {
    const httpUrl = RequestUtils.getCommonApiUrl(`/template/${crud}/getAll?sistemaId=${environment.sistemaId}`);
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.get<ResponseData<TableTemplate[]>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<TableTemplate[]>) => {
        const templates: TableTemplate[] = [];
        data.response.forEach((template) => {
          templates.push(new TableTemplate(template));
        });
        return templates;
      })
    );
  }

  public createTemplate(template: TableTemplate): Observable<TableTemplate> {
    Helpers.trimObject(template);
    const httpUrl = RequestUtils.getCommonApiUrl('/template');
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.post<ResponseData<TableTemplate>>(httpUrl, template, httpOptions).pipe(
      map((data: ResponseData<TableTemplate>) => new TableTemplate(data.response))
    );
  }

  public updateTemplate(template: TableTemplate): Observable<void> {
    Helpers.trimObject(template);
    const httpUrl = RequestUtils.getCommonApiUrl('/template');
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.put<void>(httpUrl, template, httpOptions).pipe(
      map(() => null)
    );
  }

  public updateTemplateDateOfUse(template: TableTemplate): Observable<void> {
    const httpUrl = RequestUtils.getCommonApiUrl(`/template/${template.id}/dateOfUse`);
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.put<void>(httpUrl, null, httpOptions).pipe(
      map(() => null)
    );
  }

  public clearTemplateDateOfUse(template: TableTemplate): Observable<void> {
    const httpUrl = RequestUtils.getCommonApiUrl(`/template/${template.id}/dateOfUse`);
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.delete<void>(httpUrl, httpOptions).pipe(
      map(() => null)
    );
  }

  public deleteTemplate(template: TableTemplate): Observable<void> {
    const httpUrl = RequestUtils.getCommonApiUrl('/template');
    const httpOptions = RequestUtils.getJsonOptions();
    let httpParams = new HttpParams();
    httpParams = httpParams.set('id', String(template.id));
    httpOptions.params = httpParams;
    return this.httpClient.delete<void>(httpUrl, httpOptions).pipe(
      map(() => null)
    );
  }

  public getEndpoint(path: string): string {
    return RequestUtils.getSysApiUrl(path);
  }
}
