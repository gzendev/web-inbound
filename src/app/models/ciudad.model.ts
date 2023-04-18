export class Ciudad {

  public id: number;
  public provinciaId: number;
  public descripcion: string;
  public activo: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.provinciaId = data.provinciaId;
      this.descripcion = data.descripcion;
      this.activo = data.activo;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
