import {TipoProceso} from './tipo-proceso.model';

export class TipoDesvio {

  public id: number;
  public descripcion: string;
  public tipoProceso: TipoProceso;
  public activo: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.descripcion = data.descripcion;
      this.tipoProceso = data.tipoProceso ? new TipoProceso(data.tipoProceso) : null;
      this.activo = data.activo;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
