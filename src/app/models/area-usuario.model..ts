import {Area} from './area.model';
import {Usuario} from './usuario.model';

export class AreaUsuario {

  public area: Area;
  public usuario: Usuario;
  public esResponsable: boolean;
  public esMiembro: boolean;
  public esAqs: boolean;
  public esKam: boolean;
  public esReceptorReporteAutomatico: boolean;
  public esReceptorCopiaReporteAutomatico: boolean;
  public activo: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.area = data.area;
      this.usuario = data.usuario;
      this.esResponsable = data.esResponsable;
      this.esMiembro = data.esMiembro;
      this.esAqs = data.esAqs;
      this.esKam = data.esKam;
      this.esReceptorReporteAutomatico = data.esReceptorReporteAutomatico;
      this.esReceptorCopiaReporteAutomatico = data.esReceptorCopiaReporteAutomatico;
      this.activo = data.activo;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

}
