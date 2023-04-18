import {MenuItem} from 'primeng/api';
import {InboundGestion} from '@models/inbound-gestion.model';

export class Constants {

  // Variables Generales ------------------------------------------------------------------------
  public static readonly BASE_DATE = new Date(1980, 1, 1);
  public static readonly EXITO = 'exito';
  public static readonly TIME_FORMAT = 'HH:mm';
  public static readonly DATE_FORMAT = 'dd/MM/yyyy';
  public static readonly DATE_TIME_FORMAT = 'dd/MM/yyyy HH:mm:ss';

  // Backend Paths ------------------------------------------------------------------------
  // ------ Common -------
  public static readonly CIUDAD_GMAPS_PATH = 'gmaps/ciudad';
  public static readonly CIUDAD_PATH = 'ciudad';
  public static readonly CLIENTE_PATH = 'cliente';
  public static readonly CODIGO_PATH = 'codigo';
  public static readonly CODIGO_FIND_PATH = Constants.CODIGO_PATH + '/find'
  public static readonly CUENTA_PATH = 'cuenta';
  public static readonly EMAIL_PATH = 'email';
  public static readonly ENVIRONMENT_PATH = 'environment';
  public static readonly FUNCIONES_PATH = 'funcion';
  public static readonly LISTA_EMAIL_PATH = 'listaEmail';
  public static readonly LOCALIDAD_GMAPS_PATH = 'gmaps/localidad';
  public static readonly LOCALIDAD_PATH = 'localidad';
  public static readonly MENU_FRECUENTES_PATH = 'menu/frequent';
  public static readonly MENU_PATH = 'menu';
  public static readonly MENU_INBOUND_PATH = 'menu'; // TODO: consultar!!!
  public static readonly MENU_RECIENTES_PATH = 'menu/recent';
  public static readonly MOBILE_PROVEEDOR_CFG_CAN_GENERATE_PATH = 'mobileProveedorCfg/canGenerate';
  public static readonly MOBILE_PROVEEDOR_CFG_GENERATE_PATH = 'mobileProveedorCfg/generate';
  public static readonly MOBILE_PROVEEDOR_CFG_PATH = 'mobileProveedorCfg';
  public static readonly PAIS_GMAPS_PATH = 'gmaps/pais';
  public static readonly PAIS_PATH = 'pais';
  public static readonly PROVEEDOR_CLIENTE_PATH = 'proveedorCliente';
  public static readonly PROVEEDOR_PATH = 'proveedor';
  public static readonly PROVEEDOR_TIPO_PATH = 'proveedorTipo';
  public static readonly PROVINCIA_GMAPS_PATH = 'gmaps/provincia';
  public static readonly PROVINCIA_PATH = 'provincia';
  public static readonly ROL_ASSIGN_PATH = 'rol/assign';
  public static readonly ROL_PATH = 'rol';
  public static readonly SECURITY_PATH = 'sistemas';
  public static readonly SECURITY_PERMISSIONS_PATH = 'security/permissions';
  public static readonly SECURITY_PERMISSION_PATH = 'security/permission';
  public static readonly SEGURIDAD_USUARIO_COPY_PATH = 'seguridadUsuario/copy';
  public static readonly SEGURIDAD_USUARIO_PATH = 'seguridadUsuario';
  public static readonly SISTEMA_PATH = 'sistema';
  public static readonly TIPO_DOCUMENTO_PATH = 'tipoDocumento';
  public static readonly TIPO_PROVEEDOR_PATH = 'tipoProveedor';
  public static readonly USUARIO_CUENTA_ASSIGN_PATH = 'usuarioCuenta/assign';
  public static readonly USUARIO_CUENTA_PATH = 'usuarioCuenta';
  public static readonly USUARIO_PATH = 'usuario';
  public static readonly PROFILE_PATH: 'home/profile';
  public static readonly CONFIGURATION_PATH: 'home/profile';

  // ------ DP ------
  public static readonly AREA_PATH = 'area';
  public static readonly AREA_USUARIO_PATH = 'areaUsuario';
  public static readonly DESVIO_PATH = 'desvio';
  public static readonly DESVIO_DETALLE_PATH = 'desvioDetalle';
  public static readonly PROCESO_PATH = 'proceso';
  public static readonly TIPO_DESVIO_PATH = 'tipoDesvio';
  public static readonly TIPO_PROCESO_PATH = 'tipoProceso';
  public static readonly CHOFER_PATH = 'chofer';
  public static readonly TRANSPORTE_PATH = 'transporte';

  //    ---- TMS -----

  // Códigos de Seguridad ------------------------------------------------------------

  // ----- DP ------
  public static readonly AREA_FUNCTION_ID = 'dp.Area';
  public static readonly AREA_USUARIO_FUNCTION_ID = 'dp.AreaUsuario';
  public static readonly ALERTA_TIPO_FUNCTION_ID = 'dp.TipoAlerta';
  public static readonly DESVIO_FUNCTION_ID = 'dp.Desvio';
  public static readonly PROCESO_FUNCTION_ID = 'dp.Proceso';
  public static readonly TIPO_PROCESO_FUNCTION_ID = 'dp.TipoProceso';
  public static readonly TIPO_DESVIO_FUNCTION_ID = 'dp.TipoDesvio';
  // ---- TMS ------
  public static readonly ASIGNAR_CANAL_FUNCTION_ID = 'tms.CanalAsignar';
  public static readonly ASIGNAR_CUENTA_ROL_FUNCTION_ID = 'tms.AsignarCuentaYRol';
  public static readonly CANAL_FUNCTION_ID = 'tms.Canal';
  public static readonly CHOFER_FUNCTION_ID = 'tms.Chofer';
  public static readonly CLIENTE_FUNCTION_ID = 'tms.Cliente';
  public static readonly DESTINATARIO_FUNCTION_ID = 'tms.Destinatarios';
  public static readonly LISTA_EMAIL_FUNCTION_ID = 'tms.ListaEmail';
  public static readonly MARCA_FUNCTION_ID = 'tms.MarcaVehiculo';
  public static readonly MODELO_FUNCTION_ID = 'tms.ModeloVehiculo';
  public static readonly PEDIDO_FUNCTION_ID = 'tms.Pedido';
  public static readonly PROVEEDOR_FUNCTION_ID = 'tms.Proveedor';
  public static readonly PUNTO_CLIENTE_FUNCTION_ID = 'tms.Punto.Cliente';
  public static readonly PUNTO_FUNCTION_ID = 'tms.Punto';
  public static readonly ROL_FUNCTION_ID = 'tms.Rol';
  public static readonly RUTA_FUNCTION_ID = 'tms.Ruta';
  public static readonly SEGURIDAD_FUNCTION_ID = 'tms.Seguridad';
  public static readonly SERVICIO_SATELITAL_FUNCTION_ID = 'tms.ServSatelital';
  public static readonly TIPO_SERVICIO_FUNCTION_ID = 'tms.ServicioTipo';
  public static readonly TIPO_PROVEEDOR_FUNCTION_ID = 'tms.TipoProveedor';
  public static readonly TIPO_RUTA_FUNCTION_ID = 'tms.TipoRuta';
  public static readonly TIPO_TRACCION_FUNCTION_ID = 'tms.TipoTraccion';
  public static readonly TIPO_VEHICULO_FUNCTION_ID = 'tms.TipoVehiculo';
  public static readonly TRAMO_POR_PROVEEDOR_FUNCTION_ID = 'tms.TramosProveedor';
  public static readonly TRAMO_FUNCTION_ID = 'tms.Tramos';
  public static readonly TRANSPORTE_FLOTAS_FUNCTION_ID = 'tms.Transporte.Flotas';
  public static readonly TRANSPORTE_PROVEEDORES_FUNCTION_ID = 'tms.Transporte.Proveedores';
  public static readonly TRANSPORTE_RELACIONES_FUNCTION_ID = 'tms.Transporte.Relaciones';
  public static readonly TRANSPORTE_FUNCTION_ID = 'tms.Transporte';
  public static readonly VIAJE_FUNCTION_ID = 'tms.Viaje';

  // Breadcrumbs -------------------------------------------------------------------------------------
  // **** Common Breadcrumbs ****
  public static readonly PROFILE_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.profile'});
  public static readonly CONFIGURATION_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.configuration'});
  // Breadcrumbs General
  public static readonly GENERAL_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.general'});
  // Datos Comunes
  public static readonly DATOS_COMUNES_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.datos-comunes'});
  // Listas Email
  public static readonly MANTENER_LISTAS_EMAIL_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.mantener-listas-email', url: 'home/listas_emails'});
  public static readonly DETALLE_LISTA_EMAIL_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.detalle-lista-email'});
  // Clientes
  public static readonly CLIENTES_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.clientes'});
  public static readonly MANTENER_CLIENTES_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.mantener-clientes', url: 'home/clientes'});
  public static readonly DETALLE_CLIENTE_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.detalle-cliente'});
  // Breadcrumbs Proveedores
  public static readonly PROVEEDORES_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.proveedores'});
  public static readonly MANTENER_PROVEEDORES_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.mantener-proveedores', url: 'home/proveedores'});
  public static readonly DETALLE_PROVEEDOR_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.detalle-proveedor'});
  public static readonly MANTENER_TIPOS_PROVEEDORES_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.mantener-tipos-proveedores', url: 'home/tipos_proveedores'});

  // **** DP ****
  // Areas
  public static readonly MANTENER_AREAS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.mantener-areas', url: 'home/areas'});
  public static readonly MANTENER_AREAS_USUARIOS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.mantener-areas-usuarios', url: 'home/areas_usuarios'});
  // Desvios
  public static readonly DESVIOS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.desvio'});
  public static readonly MANTENER_DESVIOS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.mantener-desvio', url: 'home/desvios'});
  public static readonly DETALLE_DESVIO_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.detalle-desvio'});

  // Breadcrumbs Seguridad
  public static readonly SEGURIDAD_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.seguridad'});
  public static readonly ASIGNAR_CUENTAS_ROLES_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.asignar-cuentas-roles', url: 'home/asignar_cuentas_roles'});
  public static readonly MANTENER_ROLES_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.mantener-roles', url: 'home/roles'});

  // Inbound
  public static readonly PROCESS_LOGISTICS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.process-logistics'});
  public static readonly INBOUNDS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.inbound', url: 'home/inbounds'});
  public static readonly INBOUND_PIEZAS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.inbound.pieza', url: 'home/inboundPiezas'});
  public static readonly INBOUND_VEHICULOS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.inbound.vehiculo', url: 'home/outboundVehiculos'});
  public static readonly INBOUND_VEHICULO_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.inbound.vehiculo', url: 'home/outboundVehiculos'});
  public static readonly INBOUND_VEHICULO_MAP_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.inbound.vehiculo.map'});
  public static readonly DETALLE_INBOUNDS_BREADCRUMB: MenuItem = Object.freeze({label: 'breadcrumb.detalle-inbound'});
  public static readonly INBOUND_PATH = 'inbound';
  public static readonly INBOUND_PIEZA_PATH = 'inboundPieza';
  public static readonly INBOUND_VEHICULO_PATH = 'inboundVehiculo';
  public static readonly INBOUND_FUNCTION_ID = 'webv2.Inbound';
  public static readonly INBOUND_PIEZA_FUNCTION_ID = 'webv2.InboundPiezas';
  public static readonly OUTBOUND_VEHICULO_FUNCTION_ID = 'webv2.InboundVehiculos';
  public static readonly INBOUND_GESTION_GEFCO_OVS: InboundGestion = Object.freeze({id: 'gefcoOvs',function: 'webv2.Inbound.GefcoOvs', title: 'inbound.title.gefcoOvs'});
  public static readonly INBOUND_GESTION_PUERT_AEROPUERTO: InboundGestion = Object.freeze({id: 'puertoAeropuerto',function: 'webv2.Inbound.PuertoAeropuerto', title: 'inbound.title.puertoAeropuerto'});
  public static readonly INBOUND_GESTION_GEFCO_IJDA: InboundGestion = Object.freeze({id: 'gefcoIjda',function: 'webv2.Inbound.GefcoIjda', title: 'inbound.title.gefcoIjda'});
  public static readonly INBOUND_GESTION_IJDA: InboundGestion = Object.freeze({id: 'ijda',function: 'webv2.Inbound.Ijda', title: 'inbound.title.ijda'});
  public static readonly INBOUND_GESTION_DESPACHANTES: InboundGestion = Object.freeze({id: 'despachantes',function: 'webv2.Inbound.Despachantes', title: 'inbound.title.despachantes'});
  public static readonly INBOUND_GESTION_ALMACEN_REPUESTOS_IJDA: InboundGestion = Object.freeze({id: 'almacenRepuestosIjda',function: 'webv2.Inbound.AlmacenRepuestosIjda', title: 'inbound.title.almacenRepuestosIjda'});
  public static readonly INBOUND_GESTION_LIST = Object.freeze([Constants.INBOUND_GESTION_GEFCO_OVS

    ,Constants.INBOUND_GESTION_PUERT_AEROPUERTO
    ,Constants.INBOUND_GESTION_GEFCO_IJDA
    ,Constants.INBOUND_GESTION_IJDA
    ,Constants.INBOUND_GESTION_DESPACHANTES
    ,Constants.INBOUND_GESTION_ALMACEN_REPUESTOS_IJDA]);
  public static readonly INBOUND_MULTIPLE = 'multiple';
  public static readonly INBOUND_FILTER_ID = 'inbound.id';
  public static readonly INBOUND_FILTER_ID_VIAJE = 'inbound.idViaje';
  public static readonly INBOUND_FILTER_ID_PIEZA = 'inboundPieza.idPieza';
  public static readonly INBOUND_FILTER_ID_VEHICULO = 'inboundVehiculo.idVehiculo';
  public static readonly INBOUND_MULTIPLES_VALORES = 'Múltiples valores';
  public static readonly VIAJES_EDITAR_TODOS = 'INB_EDITAR_TODOS';
  public static readonly DATE_TO_IGNORE_UPDATE = 9999;
    


  private constructor() {

  }
}
