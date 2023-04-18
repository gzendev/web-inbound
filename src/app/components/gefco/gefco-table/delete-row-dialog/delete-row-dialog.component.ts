import {Component, OnInit, Inject, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-gefco-table-delete-row-dialog',
  templateUrl: './delete-row-dialog.component.html',
})
export class DeleteRowDialogComponent implements OnInit {

  private row: any;
  private confirmEmitter: EventEmitter<any>;

  constructor(private dialogRef: MatDialogRef<DeleteRowDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) {

  }

  public ngOnInit(): void {
    this.row = this.dialogData.row;
    this.confirmEmitter = this.dialogData.confirmEmitter;
  }

  public confirm(): void {
    const observable = new Observable((observer: Observer<any>) => {
      this.confirmEmitter.emit({observer, row: this.row});
    });
    observable.subscribe(() => {
      this.dialogRef.close();
    }, (err) => {
      console.log(err);
    });
  }
}
