import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import isString from 'lodash-es/isString';

import {AlertService as NgxAlertService} from 'ngx-alerts';

@Injectable()
export class AlertService  {

  constructor(private alertService: NgxAlertService, private translate: TranslateService) {

  }

  public success(translationKey: string): void {
    this.translate.get(translationKey).subscribe((translation) => {
      this.alertService.success(translation);
    });
  }

  public warning(translationKey: string): void {
    this.translate.get(translationKey).subscribe((translation) => {
      this.alertService.warning(translation);
    });
  }

  public danger(err: any): void {
    let translationKey;
    if (isString(err)) {
      translationKey = err;
    } else if (err.error && err.error.message) {
      translationKey = err.error.message;
    } else if (err.message) {
      translationKey = err.message;
    }
    this.translate.get(translationKey).subscribe((translation) => {
      this.alertService.danger(translation);
      console.log(err);
    });
  }
}
