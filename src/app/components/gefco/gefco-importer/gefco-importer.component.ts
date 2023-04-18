import {Component, Input} from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse} from '@angular/common/http';
import {MatDialog} from '@angular/material';
import * as FileSaver from 'file-saver';

import {ImporterDialogComponent} from '@app/components/gefco/gefco-importer/importer-dialog/importer-dialog.component';

import {RequestUtils} from '@app/utils/request.utils';

export interface ImporterDialogData {
  data: any;
  url: string;
  importerTemplateUrl: string;
}

@Component({
  selector: 'app-gefco-importer',
  templateUrl: './gefco-importer.component.html',
})
export class GefcoImporterComponent {

  @Input()
  public importUrl: string;
  @Input()
  public data: ImporterDialogData;

  constructor(public dialog: MatDialog, private http: HttpClient) {

  }

  public downloadTemplate(): void {
    const httpUrl = RequestUtils.getSysApiUrl(`/${this.data.importerTemplateUrl}`);
    const req = new HttpRequest('POST', httpUrl, {}, {
      headers: RequestUtils.getOptions({Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}).headers,
      responseType: 'blob',
    });
    this.http.request(req).subscribe((evt) => {
      if (evt instanceof HttpResponse) {
        const name = evt.headers.get('Content-Disposition').split(';')[1].split('=')[1].replace(/"/g, '');
        const body: any = evt.body;
        FileSaver.saveAs(body, name);
      }
    }, (err) => {
      console.log(err);
    });
  }

  public openDialog(): void {
    this.dialog.open(ImporterDialogComponent, {data: this.data, width: '650px', disableClose: true});
  }
}
