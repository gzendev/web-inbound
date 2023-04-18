import {Component, Input} from '@angular/core';
import {format} from 'date-fns/esm';
import forOwn from 'lodash-es/forOwn';
import startsWith from 'lodash-es/startsWith';

import {CommonTableService} from '@services/common-table.service';
import {TableService} from '@services/table.service';
import {Constants} from '@utils/constants';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
})
export class AuditComponent {

  private static readonly TIME_KEYS = ['fechaUltimaModificacion', 'logTime'];

  @Input()
  public set logKey(logKey: any) {
    this.currentLogKey = logKey;
    this.logs = null;
  }

  @Input()
  public set lastLog(lastLog: any) {
    this.currentLastLog = lastLog;
    this.logs = null;
  }

  @Input()
  public crud: string;
  @Input()
  public commonApi: boolean;

  public currentLogKey: any;
  public currentLastLog: any;
  public logs: any[];
  public tableColumns: string[];

  constructor(private tableService: TableService, private commonTableService: CommonTableService) {

  }

  public loadLogs(): void {
    this.getTableService().getAuditRows(this.crud, this.currentLogKey).subscribe((logs) => {
      this.tableColumns = this.setTableColumns(logs);
      logs.forEach((row) => {
        row.activoBoolean = row.activo;
        forOwn(row, (value, key) => {
          if (AuditComponent.TIME_KEYS.includes(key)) {
            row[key] = format(new Date(value), Constants.DATE_TIME_FORMAT);
            row[`${key}InMilis`] = value;
          } else if (startsWith(key, 'fecha')) {
            row[key] = format(new Date(value), Constants.DATE_FORMAT);
            row[`${key}InMilis`] = value;
          } else if (value === true || value === false) {
            row[key] = value === true ? 'Sí' : 'No';
          }
        });
      });
      this.logs = logs;
    }, (err) => {
      console.log(err);
    });
  }

  private setTableColumns(logs: any): any {
    if (logs.length > 0) {
      return Object.keys(logs[0]);
    }
  }

  private getTableService(): TableService {
    return this.commonApi ? this.commonTableService : this.tableService;
  }
}
