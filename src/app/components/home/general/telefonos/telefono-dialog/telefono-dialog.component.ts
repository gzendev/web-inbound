import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {Telefono} from '@models/telefono.model';

@Component({
  selector: 'app-telefono-dialog',
  templateUrl: './telefono-dialog.component.html',
})
export class TelefonoDialogComponent implements OnInit {

  public telefono: Telefono;

  constructor(private dialogRef: MatDialogRef<TelefonoDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) {

  }

  public ngOnInit(): void {
    this.telefono = new Telefono(this.dialogData);
  }

  public saveTelefono(): void {
    this.dialogRef.close(this.telefono);
  }
}
