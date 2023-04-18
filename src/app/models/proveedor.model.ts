import {Pais} from '@models/pais.model';
import {Provincia} from '@models/provincia.model';
import {Ciudad} from '@models/ciudad.model';
import {Localidad} from '@models/localidad.model';

export class Proveedor {

  public id: string;
  public descripcion: string;
  public cuit: string;
  public pais: Pais;
  public provincia: Provincia;
  public ciudad: Ciudad;
  public localidad: Localidad;
  public direccion: string;
  public codigoPostal: string;
  public telefono: string;
  public email: string;
  public emailDp: string;
  public observacion: string;
  public tipoDocumento: string;
  public numeroDocumento: string;
  public eventual: boolean;
  public interno: boolean;
  public estatuto: boolean;
  public proveedorModelo: string;
  public codProveedorExterno: string;
  public idInternacional: string;
  public exigeReserva: boolean;
  public ctrlDocumental: boolean;
  public fechaVencPerm: Date;
  public permiso: string;
  public activo: boolean;
  public fechaUtimaModificacion: Date;
  public usuarioUltimaModificacion: string;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.descripcion = data.descripcion;
      this.cuit = data.cuit;
      this.pais = data.pais ? new Pais(data.pais) : null;
      this.provincia = data.provincia ? new Provincia(data.provincia) : null;
      this.ciudad = data.ciudad ? new Ciudad(data.ciudad) : null;
      this.localidad = data.localidad ? new Localidad(data.localidad) : null;
      this.direccion = data.direccion;
      this.codigoPostal = data.codigoPostal;
      this.telefono = data.telefono;
      this.email = data.email;
      this.emailDp = data.emailDp;
      this.observacion = data.observacion;
      this.tipoDocumento = data.tipoDocumento;
      this.numeroDocumento = data.numeroDocumento;
      this.eventual = data.eventual;
      this.interno = data.interno;
      this.estatuto = data.estatuto;
      this.proveedorModelo = data.proveedorModelo;
      this.codProveedorExterno = data.codProveedorExterno;
      this.idInternacional = data.idInternacional;
      this.exigeReserva = data.exigeReserva;
      this.ctrlDocumental = data.ctrlDocumental;
      this.fechaVencPerm = data.fechaVencPerm ? new Date(data.fechaVencPerm) : null;
      this.permiso = data.permiso;
      this.activo = data.activo;
      this.fechaUtimaModificacion = data.fechaUtimaModificacion ? new Date(data.fechaUtimaModificacion) : null;
      this.usuarioUltimaModificacion = data.usuarioUltimaModificacion;
    }
  }

  public getFullDescription(): string {
    return `${this.descripcion} (${this.id})`;
  }
}
