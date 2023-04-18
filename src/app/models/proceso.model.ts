export class Proceso {

  public id: number;
  public descripcion: string;
  public exigePST: boolean;
  public exigeProveedor: boolean;
  public activo: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.descripcion = data.descripcion;
      this.exigePST = data.descripcion ? data.descripcion.indexOf('PST') !== -1 : null; // harcoded until new definitions
      this.exigeProveedor = data.descripcion ? data.descripcion.indexOf('Compras Generales') !== -1 : null; // harcoded until new definitions
      this.activo = data.activo;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
