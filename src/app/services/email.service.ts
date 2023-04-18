import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {RequestUtils} from '@utils/request.utils';
import {ResponseData} from '@models/response-data.model';
import {Email} from '@models/email.model';

interface KeyValue {
  [index: string]: any;
}

@Injectable()
export class EmailService {

  constructor(private httpClient: HttpClient) {

  }

  public getEmails(path: string, pk: KeyValue): Observable<Email[]> {
    const httpUrl = this.getEndpoint(`/email/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    let httpParams = new HttpParams();
    Object.keys(pk).forEach((key) => {
      httpParams = httpParams.set(key, pk[key]);
    });
    httpOptions.params = httpParams;
    return this.httpClient.get<ResponseData<Email[]>>(httpUrl, httpOptions).pipe(
      map((data: ResponseData<Email[]>) => data.response.map((emailData) => {
        return new Email(emailData);
      }))
    );
  }

  public save(path: string, pk: KeyValue, email: string): Observable<Email> {
    const httpUrl = this.getEndpoint(`/email/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    let httpParams = new HttpParams();
    Object.keys(pk).forEach((key) => {
      httpParams = httpParams.set(key, pk[key]);
    });
    httpOptions.params = httpParams;
    return this.httpClient.post<ResponseData<Email>>(httpUrl, {email}, httpOptions).pipe(
      map((data: ResponseData<Email>) => new Email(data.response))
    );
  }

  public delete(path: string, email: Email): Observable<void> {
    const httpUrl = this.getEndpoint(`/email/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    const httpParas = new HttpParams().set('id', email.id).set('email', email.emailAddress);
    httpOptions.params = httpParas;
    return this.httpClient.delete<void>(httpUrl, httpOptions).pipe(
      map(() => null)
    );
  }

  public getEndpoint(path: string): string {
    return RequestUtils.getSysApiUrl(path);
  }
}
