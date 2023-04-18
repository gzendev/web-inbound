export class Email {

  public id: string;
  public emailAddress: string;
  public usuarioUltimaModificacion: string;
  public fechaUltimaModificacion: Date;
  public activo: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.emailAddress = data.emailAddress;
      this.activo = data.activo;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
      this.fechaUltimaModificacion = new Date(data.fechaUltimaModificacion);
    }
  }

}
