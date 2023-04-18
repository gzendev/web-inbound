import {Injectable} from '@angular/core';

import {TableService} from '@services/table.service';
import {RequestUtils} from '@utils/request.utils';

@Injectable()
export class CommonTableService extends TableService {

  public getEndpoint(path: string): string {
    return RequestUtils.getCommonApiUrl(path);
  }
}
