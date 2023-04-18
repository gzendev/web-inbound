export class InboundGestion {

    public id: string;
    public function: string;
    public title: string;

    constructor(data?: any) {
        if (data) {
          this.id = data.id;
          this.function = data.funcion;
          this.title = data.title;
        }
    }
}