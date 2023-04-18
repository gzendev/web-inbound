export class ConcesionariosEmail{
    public codigoCliente:string;
    public descripcion:string;
    public concesionarios:Concesionario[];

    constructor(data?: any) {
        this.codigoCliente = data.codigoCliente;
        this.descripcion = data.descripcion;
        this.concesionarios = data.concesionarios;
      }
}

export class Concesionario{
    public codigoCliente:string;
    public codigoPais:string;
    public codigoConcesionario:string;
    public descripcion:string;
    public emails:string[];

}