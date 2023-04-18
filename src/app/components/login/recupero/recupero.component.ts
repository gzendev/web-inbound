import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '@services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { AlertService } from '@services/alert.service';
import {Constants} from '@utils/constants';



@Component({
  selector: 'app-recupero',
  templateUrl: './recupero.component.html',
  styleUrls: ['./recupero.component.css']
})
export class RecuperoComponent implements OnInit {
  public user: string ;
  public errorMessage: string;
  public hasError: boolean;
  constructor(private translateService: TranslateService, 
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              public snackBar: MatSnackBar,
              private alertService: AlertService,
              private router: Router ) {

                this.activatedRoute.params.subscribe( params => { 
                 this.user = params['userRecovery'] });
               }

  ngOnInit() {
    this.translateService.resetLang("es");
    this.hasError = null;
  }

  public recupero(): void
  {
    const sleep = (milliseconds: number) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
     const volver = async () => {
       await sleep(3000);
       this.router.navigate(['/login']);
       
     }
      this.authenticationService.recovery(this.user).subscribe((recovery) => {
        if (recovery.hasError) {
          this.alertService.danger(recovery.message); 
        }
        else{
          this.alertService.success(Constants.EXITO);
          volver();
        }
    }, (err) => {
      this.alertService.danger(err);
    } );
  }

   openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
    });
 } 
  
}
