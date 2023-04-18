import {TableColumn} from '@models/table-column.model';
import {environment} from '@envs/environment';

export class TableTemplate {

  public id: number;
  public userId: string;
  public crud: string;
  public sistemaId: string;
  public name: string;
  public description: string;
  public dateOfUse: Date;
  public defaultTemplate: boolean;
  public publicTemplate = false;
  public active: boolean;
  public columns: TableColumn[];

  public search: string;
  public pageFirst: number;
  public pageSize: number;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.userId =  data.userId;
      this.crud = data.crud;
      this.sistemaId = environment.sistemaId;
      this.name = data.name;
      this.description = data.description;
      this.dateOfUse = data.dateOfUse ? new Date(data.dateOfUse) : null;
      this.defaultTemplate = data.defaultTemplate;
      this.publicTemplate = data.publicTemplate;
      this.active = data.active;
      this.columns = data.columns ? (data.columns as any[]).map((column) => {
        return new TableColumn(column);
      }) : [];

      this.search = data.search;
      this.pageFirst = data.pageFirst;
      this.pageSize = data.pageSize;
    }
  }

  public getFullName(): string {
    return `${this.name} (${this.id})`;
  }
}
