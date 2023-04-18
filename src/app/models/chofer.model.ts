export class Chofer {

  public id: number;
  public nombre: string;
  public apellido: string;
  public tipoDocumento: string;
  public nroDocumento: string;
  public fechaAlta: Date;
  public fechaBaja: Date;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.tipoDocumento = data.tipoDocumento;
      this.nroDocumento = data.nroDocumento;
      this.fechaAlta = data.fechaAlta ? new Date(data.fechaAlta) : null;
      this.fechaBaja = data.fechaBaja ? new Date(data.fechaBaja) : null;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

  public getFullName(): string {
    return `${this.nombre} ${this.apellido}`;
  }

  public getFullDescription(): string {
    let _tipoNroDoc = this.nroDocumento ? ` (${this.tipoDocumento} ${this.nroDocumento})` : '';
    return `${this.getFullName()}${_tipoNroDoc} (${this.id})`;
  }
}
