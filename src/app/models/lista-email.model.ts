export class ListaEmail {

  public id: string;
  public descripcion: string;
  public activo: boolean;
  public usuarioUltimaModificacion: string;
  public fechaUltimaModificacion: Date;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.descripcion = data.descripcion;
      this.activo = data.activo;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
    }
  }
}
