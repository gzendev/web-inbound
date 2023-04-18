import {Injectable} from '@angular/core';

import {RequestUtils} from '@utils/request.utils';
import {RestService} from '@services/rest.service';

@Injectable()
export class MockService extends RestService {

  public getEndpoint(path: string): string {
    return RequestUtils.getMockApiUrl(path);
  }
}
