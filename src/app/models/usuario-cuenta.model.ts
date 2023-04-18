import {Usuario} from '@models/usuario.model';
import {Cuenta} from '@models/cuenta.model';

export class UsuarioCuenta {

  public usuario: Usuario;
  public cuenta: Cuenta;
  public activo: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.usuario = data.usuario ? new Usuario(data.usuario) : null;
      this.cuenta = data.cuenta ? new Cuenta(data.cuenta) : null;
      this.activo = data.activo;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }
}
