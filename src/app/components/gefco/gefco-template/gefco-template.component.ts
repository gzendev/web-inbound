import {Component, Input, Output, EventEmitter} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

import {TemplateDialogComponent} from './template-dialog/template-dialog.component';

import {TableTemplate} from '@models/table-template.model';
import {StorageUtils} from '@app/utils/storage.utils';
import { GefcoFiltersComponent } from '../gefco-filters/gefco-filters.component';

export interface TemplateEvent {
  template: TableTemplate;
  dialogRef: MatDialogRef<any, any>;
}

@Component({
  selector: 'app-gefco-template',
  templateUrl: './gefco-template.component.html',
})
export class GefcoTemplateComponent {

  @Input()
  public templates: TableTemplate[];
  @Input()
  public template: TableTemplate;
  @Output()
  public create = new EventEmitter<TemplateEvent>();
  @Output()
  public update = new EventEmitter<TemplateEvent>();
  @Output()
  public delete = new EventEmitter<TableTemplate>();
  @Output()
  public select = new EventEmitter<TableTemplate>();
  @Output()
  public restart = new EventEmitter<void>();

  public userLogued: string;

  constructor(private dialog: MatDialog,
              private gefcoFiltersComponent: GefcoFiltersComponent) {
    const user = StorageUtils.getDecodedToken();
    this.userLogued = `${user.id}`;
  }

  public compareTemplate(first: TableTemplate, other: TableTemplate): boolean {
    return other && first.id === other.id;
  }

  public openTemplateDialog(newTemplate?: boolean): void {
    const template = new TableTemplate(this.template);
    if (newTemplate) {
      template.id = null;
      template.description = null;
      template.name = null;
      template.publicTemplate = false;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '%60';
    dialogConfig.height = 'auto';
    dialogConfig.data = template;
    const dialogRef = this.dialog.open(TemplateDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((updatedTemplate: TableTemplate) => {
      if (updatedTemplate) {
        updatedTemplate.defaultTemplate = false;
        updatedTemplate.active = true;
        if (!updatedTemplate.id) {
          this.create.emit({dialogRef, template: updatedTemplate});
        } else {
          this.update.emit({dialogRef, template: updatedTemplate});
        }
      }
    });
  }

  public getDefaultTemplate(): TableTemplate {
    return this.templates.find((template) => {
      return !template.id;
    });
  }

  public onTemplateUpdate(): void {
    this.update.emit({template: this.template, dialogRef: null});
    let data = {
      template: this.template,
      keepOpenedFilters: true
    }
    this.gefcoFiltersComponent.onSearch(data);
  }

  public onTemplateDelete(): void {
    this.delete.emit(this.template);
  }

  public onTemplateSelect(): void {
    this.select.emit(this.template);
  }

  public onTemplateRestart(): void {
    this.restart.emit();
  }
}
