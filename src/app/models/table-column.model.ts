import {ColumnFilter} from '@models/column-filter.model';

export class TableColumn {

  public static readonly INTEGER = 'INTEGER';
  public static readonly STRING = 'STRING';
  public static readonly LONG = 'LONG';
  public static readonly DOUBLE = 'DOUBLE';
  public static readonly BIG_DECIMAL = 'BIG_DECIMAL';
  public static readonly DATE = 'DATE';
  public static readonly DATE_TIME = 'DATE_TIME';
  public static readonly TIME = 'TIME';
  public static readonly BOOLEAN = 'BOOLEAN';

  public id: string;
  public name: string;
  public attribute: string;
  public column: string;
  public type: string;
  public filterPosition: number;
  public gridPosition: number;
  public gridSort: string;
  public visible: boolean;
  public filter: ColumnFilter;

  public label: string;
  public search: string;

  constructor(data?: any) {
    this.id = data.id;
    this.name = data.name;
    this.label = data.label ? data.label : data.name; // el label se usa para cargar la traduccion para el header del export a excel
    this.attribute = data.attribute;
    this.column = data.column;
    this.type = data.type;
    this.filterPosition = data.filterPosition;
    this.gridPosition = data.gridPosition;
    this.gridSort = data.gridSort;
    this.visible = data.visible;
    this.filter = data.filter ? new ColumnFilter(data.filter) : null;
  }
}
