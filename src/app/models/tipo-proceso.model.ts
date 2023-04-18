import {Proceso} from '@models/proceso.model';

export class TipoProceso {

  public id: number;
  public proceso: Proceso;
  public descripcion: string;
  public activo: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.proceso = data.proceso ? new Proceso(data.proceso) : null;
      this.descripcion = data.descripcion;
      this.activo = data.activo;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
