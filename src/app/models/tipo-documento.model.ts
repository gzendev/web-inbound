export class TipoDocumento {

  public id: string;
  public descripcion: string;
  public mascara: string;
  public activo: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.descripcion = data.descripcion;
      this.mascara = data.mascara;
      this.activo = data.activo;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
