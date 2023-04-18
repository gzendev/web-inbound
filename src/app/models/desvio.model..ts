import {Pais} from '@models/pais.model';
import {Proceso} from './proceso.model';
import {TipoProceso} from './tipo-proceso.model';
import {TipoDesvio} from './tipo-desvio.model.';
import {Area} from './area.model';
import {Proveedor} from './proveedor.model';
import {Cliente} from './cliente.model';
import {Usuario} from './usuario.model';
// import {DesvioDetalle} from './desvio-detalle.model.';

export class Desvio {

  public id: number;
  // public desvioDetalle: DesvioDetalle;
  public proceso: Proceso;
  public tipoProceso: TipoProceso;
  public tipoDesvio: TipoDesvio;
  public area: Area;
  public areaUsuarioCargaIncidencia: Area;
  public pais: Pais;
  public proveedor: Proveedor;
  public cliente: Cliente;
  public tieneReclamoCliente: boolean;
  public observacion: string;
  public fechaIncidencia: Date;
  public fechaCargaIncidencia: Date;
  public usuarioCargaIncidencia: Usuario;
  public activo: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      // this.desvioDetalle = data.desvioDetalle ? new DesvioDetalle(data.desvioDetalle) : null;
      this.proceso = data.proceso ? new Proceso(data.proceso) : null;
      this.tipoProceso = data.tipoProceso ? new TipoProceso(data.tipoProceso) : null;
      this.tipoDesvio = data.tipoDesvio ? new TipoDesvio(data.tipoDesvio) : null;
      this.area = data.area ? new Area(data.area) : null;
      this.area = data.areaUsuarioCargaIncidencia ? new Area(data.areaUsuarioCargaIncidencia) : null;
      this.pais = data.pais ? new Pais(data.pais) : null;
      this.proveedor = data.proveedor ? new Proveedor(data.proveedor) : null;
      this.cliente = data.cliente ? new Cliente(data.cliente) : null;
      this.tieneReclamoCliente = data.tieneReclamoCliente;
      this.observacion = data.observacion;
      this.fechaIncidencia = data.fechaIncidencia ? new Date(data.fechaIncidencia) : new Date();
      this.fechaCargaIncidencia = data.fechaCargaIncidencia ? new Date(data.fechaCargaIncidencia) : null;
      this.usuarioCargaIncidencia = data.usuario ? new Usuario(data.usuario) : null;
      this.activo = data.activo;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
      // console.log(JSON.stringify(data));
    }
  }

}
