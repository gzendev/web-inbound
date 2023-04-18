import {Component, Inject, ViewChild, ElementRef} from '@angular/core';
import {HttpClient, HttpRequest, HttpEventType, HttpResponse} from '@angular/common/http';
import {MAT_DIALOG_DATA} from '@angular/material';
import {Subject, Observable} from 'rxjs';
import * as FileSaver from 'file-saver';

import {RequestUtils} from '@utils/request.utils';

@Component({
  selector: 'app-importer-dialog',
  templateUrl: 'importer-dialog.component.html',
  styleUrls: ['./importer-dialog.component.css'],
})
export class ImporterDialogComponent {

  public selectedFile: File;
  public selectedAccount: any;

  public displayedColumns = ['fila', 'solapa', 'error'];
  public progress: Observable<number>;
  public uploading = false;
  public uploadSuccessful = false;
  public uploadError = false;
  public uploadErrors: any[] = [];
  public showErrors = false;

  @ViewChild('file')
  private file: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: any, private http: HttpClient) {

  }

  public addFiles(): void {
    this.file.nativeElement.click();
  }

  public onFileAdded(): void {
    this.selectedFile = this.file.nativeElement.files[0];
  }

  public processFile(ignoreErrors: boolean): void {
    this.uploading = true;
    this.progress = this.upload(ignoreErrors);
  }

  public exportTable(): void {
    const table = document.getElementById('errorTable');
    const headers = document.getElementById('errorTable').getElementsByTagName('thead')[0].getElementsByTagName('tr')[0].getElementsByTagName('th');
    const body = table.getElementsByTagName('tbody')[0];
    const rows = body.getElementsByTagName('tr');
    let csvString = `${headers[0].innerText};${headers[1].innerText};${headers[2].innerText}\r\n`;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < rows.length; i += 1) {
      const cells = rows[i].getElementsByTagName('td');
      csvString += `${cells[0].innerText};${cells[1].innerText};${cells[2].innerText}\r\n`;
    }
    const blob = new Blob([csvString], {type: 'text/csv;charset=utf-8'});
    FileSaver.saveAs(blob, 'errores.csv');
  }

  public upload(ignoreErrors: boolean): Observable<number> {
    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    const req = new HttpRequest('POST', RequestUtils.getSysApiUrl(`/${this.dialogData.url}/${this.selectedAccount.id}/${ignoreErrors ? 1 : 0}`), formData, {
      headers: RequestUtils.getOptions().headers,
      reportProgress: true,
    });
    const progress = new Subject<number>();
    this.http.request(req).subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * event.loaded / event.total);
        progress.next(percentDone);
      } else if (event instanceof HttpResponse) {
        progress.complete();
        const body: any = event.body;
        this.uploadError = body.hasError;
        if (this.uploadError) {
          this.uploadErrors = body.response;
        } else {
          this.uploadSuccessful = true;
        }
      }
    });
    return progress.asObservable();
  }

  public reprocess(): void {
    this.progress = null;
    this.uploading = false;
    this.uploadSuccessful = false;
    this.uploadError = false;
    this.showErrors = false;
    this.selectedFile = null;
  }

  public back(): void {
    this.progress = null;
    this.uploading = false;
    this.uploadSuccessful = false;
    this.uploadError = false;
    this.showErrors = false;
    this.selectedAccount = null;
    this.selectedFile = null;
  }
}
