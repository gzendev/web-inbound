import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import isNil from 'lodash-es/isNil';

import {RequestUtils} from '@utils/request.utils';
import {Helpers} from '@utils/helpers';
import {ResponseData} from '@models/response-data.model';

interface KeyValue {
  [index: string]: any;
}

@Injectable()
export class RestService {

  constructor(protected httpClient: HttpClient) {

  }

  public get(path: string, params?: KeyValue): Observable<any> {
    const httpUrl = this.getEndpoint(`/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    httpOptions.params = this.toHttpParams(params);
    return this.httpClient.get<ResponseData<any>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<any>) => data.response)
    );
  }

  public getList(path: string, params?: KeyValue): Observable<any[]> {
    return this.get(path, params);
  }

  public getAll(path: string, params?: KeyValue): Observable<any[]> {
    return this.getList(`${path}/all`, params);
  }

  public find(path: string, params?: KeyValue): Observable<any[]> {
    return this.getList(`${path}/find`, params);
  }

  public save(path: string, obj: any, params?: KeyValue): Observable<any> {
    Helpers.trimObject(obj);
    const httpUrl = this.getEndpoint(`/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    httpOptions.params = this.toHttpParams(params);
    return this.httpClient.post<ResponseData<any>>(httpUrl, obj, httpOptions).pipe(
      map((data: ResponseData<any>) => data.response)
    );
  }

  public saveAll(path: string, obj: any, params?: KeyValue): Observable<void> {
    return this.save(`${path}/all`, obj, params);
  }

  public update(path: string, obj: any, params?: KeyValue): Observable<void> {
    Helpers.trimObject(obj);
    const httpUrl = this.getEndpoint(`/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    httpOptions.params = this.toHttpParams(params);
    return this.httpClient.put<ResponseData<void>>(httpUrl, obj, httpOptions).pipe(
      map(() => null)
    );
  }

  public updateAll(path: string, obj: any, params?: KeyValue): Observable<void> {
    return this.update(`${path}/all`, obj, params);
  }

  public delete(path: string, params: KeyValue): Observable<void> {
    const httpUrl = this.getEndpoint(`/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    httpOptions.params = this.toHttpParams(params);
    return this.httpClient.delete<void>(httpUrl, httpOptions).pipe(
      map(() => null)
    );
  }

  public getEndpoint(path: string): string {
    return RequestUtils.getSysApiUrl(path);
  }

  private toHttpParams(params: KeyValue): HttpParams {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (!isNil(params[key])) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }
    return httpParams;
  }
}
