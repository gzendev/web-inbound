import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';

import {StorageUtils} from '@utils/storage.utils';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {

  }

  public canActivate(): boolean {
    if (StorageUtils.getUser()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
