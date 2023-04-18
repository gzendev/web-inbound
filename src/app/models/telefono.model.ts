export class Telefono {

  public id: string;
  public telefono: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.telefono = data.telefono;
    }
  }
}
