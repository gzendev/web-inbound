import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ChangeEmail } from "@app/models/changeEmail.model";
import { ChangePassword } from "@app/models/changePassword.model";
import { User } from "@app/models/user.model";
import { AlertService } from "@app/services/alert.service";
import { AuthenticationService } from "@app/services/authentication.service";
import { CommonRestService } from "@app/services/common-rest.service";
import { Constants } from "@app/utils/constants";
import { StorageUtils } from "@app/utils/storage.utils";
import { BaseComponent } from "../base.component";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
})
export class ProfileComponent extends BaseComponent implements OnInit {
  changePassword: ChangePassword;
  changeEmail: ChangeEmail;
  emailModificado:Boolean;
  hide : Boolean;
  emailPattern: string;

  miForm: FormGroup = this.fb.group({
    oldPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!_@#\$%\^&\*])(?=.{8,})/), Validators.minLength(8)]]
  })

  protected getFunctionId(): string {
    return "";
    // throw new Error("Method not implemented.");
  }

  constructor(
    private fb: FormBuilder,
    protected commonRestService: CommonRestService,
    protected router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    super(commonRestService, router);
    this.breadcrumb = [Constants.PROFILE_BREADCRUMB];
    this.changePassword = new ChangePassword();
    this.changeEmail = new ChangeEmail();
    this.hide = true;
  }

  ngOnInit(): void {
    this.changeEmail.email = StorageUtils.getUser().email;
    this.emailModificado = false;
    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  }

  public updatePass() {
    const sleep = (milliseconds: number) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };

    const volver = async () => {
      await sleep(3000);
      this.router.navigate(["/login"]);
    };

    let us: User = StorageUtils.getUser();
    if (us == null) {
      this.router.navigate(["/login"]);
    }

    let cp = new ChangePassword();
    cp.user = us.userName;
    cp.oldPassword = this.miForm.value.oldPassword;
    cp.newPassword = this.miForm.value.newPassword

    this.authenticationService.changePass(cp).subscribe(
      (recovery) => {
        if (recovery.hasError) {
          this.alertService.danger(recovery.message);
        } else {
          this.alertService.success(Constants.EXITO);
          volver();
        }
      },
      (err) => {
        this.alertService.danger(err);
        this.changePassword.newPassword = "";
        this.changePassword.oldPassword = "";
      }
    );
  }

  // public modificandoEmail(){
  //   this.emailModificado = true;
  // }

  // public updateEmail(){
  //   let us: User = StorageUtils.getUser();
  //   if (us == null) {
  //     this.router.navigate(["/login"]);
  //   }

  //   let ce = new ChangeEmail();
  //   ce.user = us.userName;
  //   ce.email = this.changeEmail.email;

  //   this.authenticationService.changeEmail(ce).subscribe(
  //     (recovery) => {
  //       if (recovery.hasError) {
  //         this.alertService.danger(recovery.message);
  //       } else {
  //         let user = StorageUtils.getUser();
  //         user.email= ce.email;
  //         StorageUtils.setUser(user);
  //         this.alertService.success(Constants.EXITO);
  //         this.emailModificado = false;
  //       }
  //     },
  //     (err) => {
  //       this.alertService.danger(err);
  //     }
  //   );
  // }
}
