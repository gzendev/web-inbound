import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {CommonEmailService} from '@services/common-email.service';
import {EmailService} from '@services/email.service';
import {AlertService} from '@services/alert.service';

@Component({
  selector: 'app-email-dialog',
  templateUrl: './email-dialog.component.html',
})
export class EmailDialogComponent {

  public email: string;

  constructor(private commonEmailService: CommonEmailService, private emailService: EmailService, private alertService: AlertService, private dialogRef: MatDialogRef<EmailDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) {

  }

  public saveEmail(): void {
    this.getEmailService().save(this.dialogData.path, this.dialogData.emailsKey, this.email).subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      this.alertService.danger(err);
    });
  }

  public getEmailService(): EmailService {
    return this.dialogData.commonApi ? this.commonEmailService : this.emailService;
  }
}
