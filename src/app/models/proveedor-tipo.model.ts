import {Proveedor} from '@models/proveedor.model';
import {TipoProveedor} from '@models/tipo-proveedor.model';
import {Pais} from '@models/pais.model';

export class ProveedorTipo {

  public pais: Pais;
  public proveedor: Proveedor;
  public tipoProveedor: TipoProveedor;
  public activo: boolean;
  public fechaUltimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.pais = data.pais ? new Pais(data.pais) : null;
      this.proveedor = data.proveedor ? new Proveedor(data.proveedor) : null;
      this.tipoProveedor = data.tipoProveedor ? new TipoProveedor(data.tipoProveedor) : null;
      this.activo = data.activo;
      this.fechaUltimaModificacion = data.fechaUltimaModificacion ? new Date(data.fechaUltimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }
}
