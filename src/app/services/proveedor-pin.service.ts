import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {RequestUtils} from '@utils/request.utils';
import {ResponseData} from '@models/response-data.model';
import {CommonRestService} from '@services/common-rest.service';
import {ProveedorPin} from '@models/proveedor-pin.model';

@Injectable()
export class ProveedorPinService extends CommonRestService {

  public update(path: string, obj: any): Observable<any> {
    const httpUrl = this.getEndpoint(`/${path}`);
    const httpOptions = RequestUtils.getJsonOptions();
    return this.httpClient.put<ResponseData<any>>(httpUrl, obj, httpOptions).pipe(
      map((data: ResponseData<any>) => new ProveedorPin(data.response))
    );
  }
}
