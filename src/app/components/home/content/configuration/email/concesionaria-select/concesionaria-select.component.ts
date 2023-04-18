import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { Concesionario } from '@app/models/concesionariosEmail.model';

@Component({
  selector: 'app-concesionaria-select',
  templateUrl: './concesionaria-select.component.html',
  styleUrls: ['./concesionaria-select.component.css']
})
export class ConcesionariaSelectComponent implements OnInit {
  @Input() clients:Array<{id:number, name:string, concesionarias:Array<{id:number, name:string, emails: Array<string>}>}>; 
  @Output() onSelectConcesionaria = new EventEmitter<Concesionario>();
  @Output() onResetConcesionaria = new EventEmitter();

  constructor() { }
  selectConcesionaria(concesionaria:Concesionario) {
    this.onSelectConcesionaria.emit(concesionaria)
  }
  resetConcesionaria() {
    this.onResetConcesionaria.emit()
  }
  ngOnInit() {
  }

}
