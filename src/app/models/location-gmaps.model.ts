export class LocationGMaps {

  public id: number;
  public googleShortName: string;
  public googleLongName: string;
  public activo: boolean;
  public fechaUtimaModificacion: Date;
  public usuarioUltimaModificacion: string ;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.googleShortName = data.googleShortName;
      this.googleLongName = data.googleLongName;
      this.activo = data.activo;
      this.fechaUtimaModificacion = data.fechaUtimaModificacion ? new Date(data.fechaUtimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }
}
