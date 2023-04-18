import {Injectable} from '@angular/core';

import {RestService} from '@services/rest.service';
import {RequestUtils} from '@utils/request.utils';

@Injectable()
export class CommonRestService extends RestService {

  public getEndpoint(path: string): string {
    return RequestUtils.getCommonApiUrl(path);
  }
}
