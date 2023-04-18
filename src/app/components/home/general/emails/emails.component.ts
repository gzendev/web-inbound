import {Component, OnInit, Input} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';

import {EmailDialogComponent} from '@components/home/general/emails/email-dialog/email-dialog.component';

import {EmailService} from '@services/email.service';
import {CommonEmailService} from '@services/common-email.service';
import {Email} from '@models/email.model';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
})
export class EmailsComponent implements OnInit {

  @Input()
  public path: string;
  @Input()
  public emailsKey: any;
  @Input()
  public viewing: boolean;
  @Input()
  public commonApi: boolean;

  public emailsColumns: string[] = ['acciones', 'email', 'usuarioUltimaModificacion', 'fechaUltimaModificacion'];
  public emails: Email[];

  constructor(private emailService: EmailService, private commonEmailService: CommonEmailService, private dialog: MatDialog) {

  }

  public ngOnInit(): void {
    if (this.viewing) {
      this.emailsColumns.shift();
    }
    this.loadEmails();
  }

  public deleteEmail(email: Email): void {
    this.getEmailService().delete(this.path, email).subscribe(() => {
      this.loadEmails();
    }, (err) => {
      console.log(err);
    });
  }

  public openEmailDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '%60';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      path: this.path,
      emailsKey: this.emailsKey,
      commonApi: this.commonApi,
    };
    const dialogRef = this.dialog.open(EmailDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.loadEmails();
    });
  }

  private loadEmails(): void {
    this.getEmailService().getEmails(this.path, this.emailsKey).subscribe((emails) => {
      this.emails = emails;
    }, (err) => {
      console.log(err);
    });
  }

  private getEmailService(): EmailService {
    return this.commonApi ? this.commonEmailService : this.emailService;
  }
}
