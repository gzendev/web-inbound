export class MapInfo {
  public vin: string;
  public hojaRuta: string;
  public coordenadas: string;
  public url: string;
  public tractor: string;
  public remolque: string;
  public chofer: string;
  public detalles: string[];
  public ultimaLectura: string;

  constructor(data?: any) {
    if (data) {
      this.vin = data.vin;
      this.hojaRuta = data.hojaRuta;
      this.coordenadas = data.coordenadas;

      this.url = data.url;
      this.tractor = data.tractor;
      this.remolque = data.remolque;
      this.chofer = data.chofer;
      this.detalles = data.detalles;
      this.ultimaLectura = data.ultimaLectura ? data.ultimaLectura : '';
    }
  }
}
