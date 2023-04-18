import {Codigo} from './codigo.model';
import {Transporte} from './transporte.model';
import {Chofer} from './chofer.model';
import {Desvio} from './desvio.model.';

export class DesvioDetalle {

  public id: number;
  public desvio: Desvio;
  public incumplimiento: Codigo;
  public nroHojaRuta: string;
  public codRemito: string;
  public nroReserva: string;
  public chofer: Chofer;
  public choferText: string;
  public origen: string;
  public destino: string;
  public tractor: Transporte;
  public tractorPatenteText: string;
  public remolque: Transporte;
  public remolquePatenteText: string;
  public imo: boolean;
  public activo: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.desvio = data.desvio ? new Desvio(data.desvio) : null;
      this.incumplimiento = data.incumplimiento ? new Codigo(data.incumplimiento) : null;
      this.nroHojaRuta = data.nroHojaRuta;
      this.codRemito = data.codRemito;
      this.nroReserva = data.nroReserva;
      this.chofer = data.chofer ? new Chofer(data.chofer) : null;
      this.choferText = data.choferText;
      this.origen = data.origen;
      this.destino = data.destino;
      this.tractor = data.tractor ? new Transporte(data.tractor) : null;
      this.tractorPatenteText = data.tractorPatenteText;
      this.remolque = data.remolque ? new Transporte(data.remolque) : null;
      this.remolquePatenteText = data.remolquePatenteText;
      this.imo = data.imo;
      this.activo = data.activo;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }
}
