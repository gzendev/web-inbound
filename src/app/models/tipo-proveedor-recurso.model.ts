export class TipoProveedorRecurso {

  public id: string;
  public descripcion: string;
  public permiteMultiplesRel: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;
  public activo: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.descripcion = data.descripcion;
      this.permiteMultiplesRel = data.permiteMultiplesRel;
      this.activo = data.activo;
      this.fechaUltimaModificacion = new Date(data.fechaUltimaModificacion);
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
