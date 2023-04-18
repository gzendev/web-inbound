import {Component, OnInit, Input} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {CommonRestService} from '@services/common-rest.service';
import {StorageUtils} from '@utils/storage.utils';
import {Constants} from '@utils/constants';
import { ChangePassword } from '@app/models/changePassword.model';
import { User } from '@app/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';
import { AlertService } from '@services/alert.service';
import { environment } from '@envs/environment';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
          .mat-dialog-container {
              max-width: 100%;
              max-height: 100% !important;
              width: 400px !important;
              resize: both;
            }`],
})
export class HeaderComponent implements OnInit {


  @Input()
  public sidenav: any;
  public idioma: string;
  public enviroment: string;
  public shortEnviroment: string;
  public username: string;
  public userId: string;
  public older: string;
  public newer: string;
  public DialogChangePass: boolean = false;
  public userInactivity: any;

  public passwordResetUrl = `${environment.accountsServiceURL}/login?callbackURL=${window.location.href}`;

  hide = true;

  constructor(private translate: TranslateService, 
              private commonRestService: CommonRestService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private alertService: AlertService,) {

  }

  public ngOnInit(): void {
    this.inactivityTime();
    const idioma = StorageUtils.getIdioma();
    if (idioma) {
      this.setIdioma(idioma);
    }
    this.commonRestService.getList(Constants.ENVIRONMENT_PATH, {}).subscribe((data) => {
      this.enviroment = String(data);
      if (this.enviroment === 'STAGING') {
        this.enviroment = 'STG';
      }
      if (this.enviroment === 'TEST') {
        this.enviroment = 'TST';
      }
      if (this.enviroment === 'DESA') {
        this.enviroment = 'DES';
      }
      if (this.enviroment === 'GEADCAP') {
        this.enviroment = 'PRD';
      }

    });
    const user = StorageUtils.getDecodedToken();
    this.username = `${user.nombre} ${user.apellido} `;
    this.userId = ` (${user.id})`;
  }

  public updatePass(){
    const sleep = (milliseconds: number) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
     const volver = async () => {
       await sleep(3000);
       this.router.navigate(['/login']);
       
     }

    let us: User = StorageUtils.getUser();
    if (us == null){
      this.router.navigate(['/login']);
    }
    let cp = new ChangePassword();
    cp.user = us.userName;
    cp.oldPassword = this.older;
    cp.newPassword = this.newer;
   
    this.authenticationService.changePass(cp).subscribe((recovery) => {
      if (recovery.hasError) {
        this.alertService.danger(recovery.message); 
      }
      else{
        this.alertService.success(Constants.EXITO);
        volver();
      }
  }, (err) => {
    this.alertService.danger(err);
    this.showDialogChangePass();
  } );

  }

  public showDialogChangePass(){
    this.DialogChangePass = (!this.DialogChangePass);
    if(!this.DialogChangePass){
      this.older = "";
      this.newer = "";
    }
  }
  public setIdioma(idioma: string, reload?: boolean): void {
    StorageUtils.setIdioma(idioma);
    this.translate.use(idioma);
    this.idioma = idioma;
    if (reload) {
      window.location.reload();
    }
  }

  public logout() {
    let lastUrl = window.location.pathname;
    let pathname = lastUrl.substr(6);
    localStorage.setItem("LAST_URL", pathname);
    localStorage.setItem("LAST_USER_ID", this.userId);
    this.authenticationService.recentAccess(lastUrl).subscribe(() => {
      console.log("anda la requesttt");
    });
    this.router.navigate(['/login']);
  }

  public inactivityTime() {
    window.onload = this.resetTimer;
    document.onmousemove = this.resetTimer;
    document.onkeypress = this.resetTimer;
};

public resetTimer = (() => {
    clearTimeout(this.userInactivity);
    this.userInactivity = setTimeout(() => {
      this.logout();
    }, 1800000)
}) 
}
