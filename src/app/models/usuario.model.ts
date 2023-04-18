export class Usuario {

  public id: number;
  public nombre: string;
  public apellido: string;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.nombre = data.nombre;
      this.apellido = data.apellido;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

  public getFullName(): string {
    return `${this.nombre} ${this.apellido}`;
  }

  public getFullDescription(): string {
    return `${this.getFullName()} (${this.id})`;
  }
}
