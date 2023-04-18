export class Rol {

  public id: number;
  public descripcion: string;
  public activo: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.descripcion = data.descripcion;
      this.activo = data.activo;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
