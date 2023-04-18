import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import isNil from 'lodash-es/isNil';

import {TelefonoDialogComponent} from '@components/home/general/telefonos/telefono-dialog/telefono-dialog.component';

import {Telefono} from '@models/telefono.model';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
})
export class TelefonosComponent implements OnInit {

  @Input()
  public viewing: boolean;
  @Input()
  public telefonosStr: string;
  @Output()
  public update = new EventEmitter<string>();

  public telefonos: Telefono[];
  public telefonosColumns = ['acciones', 'telefono'];

  constructor(private dialog: MatDialog) {

  }

  public ngOnInit(): void {
    if (this.viewing) {
      this.telefonosColumns.shift();
    }
    this.loadTelefonos(this.telefonosStr);
  }

  public openTelefonoDialog(telefono?: Telefono): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = 'auto';
    dialogConfig.data = telefono || null;
    const dialogRef = this.dialog.open(TelefonoDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((updatedTelefono: Telefono) => {
      if (updatedTelefono) {
        if (!isNil(updatedTelefono.id)) {
          const telefonoFound = this.telefonos.find((currentTelefono) => {
            return currentTelefono.id === updatedTelefono.id;
          });
          telefonoFound.telefono = updatedTelefono.telefono;
        } else {
          this.telefonos.push(new Telefono({
            id: this.telefonos.length,
            telefono: updatedTelefono.telefono,
          }));
        }
        this.telefonos = [...this.telefonos];
      }
      this.refreshTelefonos();
    });
  }

  public deleteTelefono(telefono: Telefono): void {
    const oldTelefonos = this.telefonos;
    this.telefonos = [];
    let id = 0;
    for (const oldTelefono of oldTelefonos) {
      if (telefono.id !== oldTelefono.id) {
        this.telefonos.push(new Telefono({id, telefono: oldTelefono.telefono}));
        id +=  1;
      }
    }
    this.refreshTelefonos();
  }

  public refreshTelefonos(): void {
    let telefonosStr = '';
    for (const telefono of this.telefonos) {
      telefonosStr = `${telefono.telefono};${telefonosStr}`;
    }
    this.update.emit(telefonosStr);
  }

  private loadTelefonos(telefonosStr: string): void {
    this.telefonos = [];
    if (telefonosStr) {
      const telefonos = telefonosStr.split(';');
      let id = 0;
      for (const telefono of telefonos) {
        if (telefono) {
          this.telefonos.push(new Telefono({id, telefono}));
          id = id + 1;
        }
      }
    }
  }
}
