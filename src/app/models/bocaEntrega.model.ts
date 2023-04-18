export class BocaEntrega{
    public codigoBocaEntrega:string;
    public codigoPais:string;
    public codigoCliente:string;
    public codigoConcesionario:string;
    public descripcion:string;
    public emails:string[];
    
    constructor(data?: any) {
        this.codigoCliente = data.codigoCliente;
        this.descripcion = data.descripcion;
        this.codigoPais = data.codigoPais;
        this.codigoConcesionario = data.codigoConcesionario;
        this.codigoBocaEntrega = data.codigoBocaEntrega;
        this.emails = data.emails;
      }
}