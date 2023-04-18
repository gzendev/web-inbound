import {Injectable} from '@angular/core';

import {EmailService} from '@services/email.service';
import {RequestUtils} from '@utils/request.utils';

@Injectable()
export class CommonEmailService extends EmailService {

  public getEndpoint(path: string): string {
    return RequestUtils.getCommonApiUrl(path);
  }
}
