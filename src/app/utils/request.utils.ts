import {HttpHeaders, HttpParams} from '@angular/common/http';

import {StorageUtils} from '@utils/storage.utils';
import {environment} from '@envs/environment';

interface HttpOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
  observe?: 'body';
}

export class RequestUtils {

  private static readonly HEADER_USER_NAME = 'UserName';
  private static readonly HEADER_AUTHORIZATION = 'Authorization';
  private static readonly HEADER_SISTEMA_ID = 'SistemaId';

  private constructor() {

  }

  public static getSysApiUrl(url: string): string {
    return environment.webv2ApiUrl + url;
  }

  public static getCommonApiUrl(url: string): string {
    return environment.commonApiUrl + url;
  }

  public static getMockApiUrl(url: string): string {
    return `http://localhost:3000${url}`;
  }

  public static getJsonOptions(customHeaders?: any): HttpOptions {
    return RequestUtils.getOptions({
      ...customHeaders,
      'Content-Type': 'application/json',
    });
  }

  public static getBlobOptions(customHeaders?: any): HttpOptions {
    return RequestUtils.getOptions({
      ...customHeaders,
      Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }, {
      observe: 'body',
      responseType: 'blob',
    });
  }

  public static getOptions(customHeaders?: any, others?: any): HttpOptions {
    const headers: any = {...customHeaders};
    const user = StorageUtils.getUser();
    if (user) {
      if (user.token) {
        headers[RequestUtils.HEADER_AUTHORIZATION] = user.token;
      }
      if (user.userName) {
        headers[RequestUtils.HEADER_USER_NAME] = user.userName;
      }
    }
    headers[RequestUtils.HEADER_SISTEMA_ID] = environment.sistemaId;
    return {headers: new HttpHeaders(headers), ...others};
  }
}
