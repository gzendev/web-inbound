import {Router} from '@angular/router';
import {EMPTY, Observable, forkJoin, of} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {MenuItem} from 'primeng/api';

import {CommonRestService} from '@services/common-rest.service';
import {Constants} from '@utils/constants';
import {environment} from '@envs/environment';

export abstract class BaseComponent {

  public breadcrumb: MenuItem[];
  public readPermission = false;
  public writePermission = false;
  public loading = true;

  protected constructor(protected commonRestService: CommonRestService, protected router: Router) {

  }

  public init(): Observable<void> {
    return this.loadPermissions().pipe(
      mergeMap(() => {
        if (this.readPermission) {
          return of(null);
        }
        this.router.navigate(['/home/permission-denied'], {skipLocationChange: true});
        return EMPTY;
      })
    );
  }

  protected abstract getFunctionId(): string;

  private loadPermissions(): Observable<void> {
    return forkJoin(
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: `${this.getFunctionId()}.Read`, sistemaId: environment.sistemaId}),
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: `${this.getFunctionId()}.Write`, sistemaId: environment.sistemaId})
    ).pipe(
      mergeMap((permissions) => {
        this.readPermission = !permissions[0].denied;
        this.writePermission = !permissions[1].denied;
        return of(null);
      })
    );
  }
}
