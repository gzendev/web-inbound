import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {TableTemplate} from '@models/table-template.model';

@Component({
  selector: 'app-template-dialog',
  templateUrl: './template-dialog.component.html',
})
export class TemplateDialogComponent implements OnInit {

  public template: TableTemplate;

  constructor(private dialogRef: MatDialogRef<TemplateDialogComponent>, @Inject(MAT_DIALOG_DATA) private dialogData: any) {

  }

  public ngOnInit(): void {
    this.template = new TableTemplate(this.dialogData);
  }

  public save(): void {
    this.template.name = this.template.name.trim();
    this.template.description = this.template.description ? this.template.description.trim() : null;
    this.template.publicTemplate = this.template.publicTemplate ? true : false;
    this.dialogRef.close(this.template);
  }
}
