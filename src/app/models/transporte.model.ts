import {Pais} from './pais.model';

export class Transporte {

  public id: number;
  public descripcion: string;
  public tipoVehiculoDescripcion: string;
  public patente: string;
  public activo: boolean;
  public pais: Pais;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.descripcion = data.descripcion;
      this.tipoVehiculoDescripcion = data.tipoVehiculoDescripcion;
      this.patente = data.patente;
      this.activo = data.activo;
      this.pais = data.pais ? new Pais(data.pais) : null;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

  public getFullDescription(): string {
    let tipoVehiculoDesc: string;
    if (this.tipoVehiculoDescripcion) {
      tipoVehiculoDesc = ` - ${this.tipoVehiculoDescripcion}`;
    }
    return `${this.patente}${tipoVehiculoDesc} (${this.id})`;
  }
}
