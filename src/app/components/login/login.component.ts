import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of, forkJoin} from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import {AuthenticationService} from '@services/authentication.service';
import {UserLogin} from '@models/user-login.model';
import {CommonRestService} from '@services/common-rest.service';
import {Constants} from '@utils/constants';
import {environment} from '@envs/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public user: string;
  public password: string;
  public signingIn = false;
  public errorMessage: string;
  public hasGestionIjda: boolean;
  public hasGestionAlmacen: boolean; 
  ambiente = environment.ambiente;

  public passwordResetUrl = `${environment.accountsServiceURL}/forgot-password?callbackURL=${window.location.href}`;
  
  constructor(private authenticationService: AuthenticationService, private translateService: TranslateService, private router: Router, protected commonRestService: CommonRestService) {

  }

  public ngOnInit(): void {
    this.authenticationService.logout();
    localStorage.removeItem('USER_TOKEN');
  }

  public login(): void 
  {
    this.signingIn = true;
    const userLogin = new UserLogin({
      user: this.user,
      password: this.password,
    });
    this.authenticationService.login(userLogin).subscribe((user) => {
      if (user.language) {
        this.translateService.use(user.language);
      }
      this.permisoViaje().subscribe(()=> {
        this.permisoPieza().subscribe(()=>{
            const lastUserId = localStorage.getItem('LAST_USER_ID');
            const currentUser = ` (${user.userName})`;
            if(lastUserId === currentUser) {
              const lastUrl = localStorage.getItem('LAST_URL');
              this.router.navigate([lastUrl]);
            }
            else {
              if(this.hasGestionIjda)
              this.router.navigate(['/home/inboundPiezas']);
              else if(!this.hasGestionAlmacen)
              this.router.navigate(['/home/inboundVehiculos']);
              else
              this.router.navigate(['/home/inbounds']);
            }
        })
      });
      // localStorage.removeItem('TEMPLATE');
      
    }, (err) => {
      if (err.status === 401) {
        this.errorMessage = 'User or password is incorrect.' ;
      } else {
        console.log(err);
      }
      this.signingIn = false;
    });
  }

  private permisoPieza(): Observable<void> {
    return forkJoin(
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: Constants.INBOUND_GESTION_IJDA.function, sistemaId: environment.sistemaId}),
      ).pipe(
      mergeMap((permissions) => {
        this.hasGestionIjda = !permissions[0].denied;
        return of(null);
      })
    );
  }

  private permisoViaje(): Observable<void> {
    return forkJoin(
      this.commonRestService.get(Constants.SECURITY_PERMISSION_PATH, {functionId: Constants.INBOUND_GESTION_ALMACEN_REPUESTOS_IJDA.function, sistemaId: environment.sistemaId}),
      ).pipe(
      mergeMap((permissions) => {
        this.hasGestionAlmacen = !permissions[0].denied;
        return of(null);
      })
    );
  }

  
}
