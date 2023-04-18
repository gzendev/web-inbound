import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent implements OnInit {

  public title: string;
  public content: string;
  public alert: boolean;

  constructor(private dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) {

  }

  public ngOnInit(): void {
    const data = this.dialogData || {};
    this.title = data.title || 'confirm-dialog.confirmacion.titulo';
    this.content = data.content || 'confirm-dialog.confirmacion.contenido';
    this.alert = data.alert;
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }
}
