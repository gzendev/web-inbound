import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { BocaEntrega } from '@app/models/bocaEntrega.model';

@Component({
  selector: 'app-bocas-select',
  templateUrl: './bocas-select.component.html',
  styleUrls: ['./bocas-select.component.css']
})
export class BocasSelectComponent implements OnInit {
  @Input() bocas: Array<BocaEntrega>; 
  @Output() onSelectBoca = new EventEmitter<BocaEntrega>();
  @Output() onResetBoca = new EventEmitter();

  constructor() { }
  selectBoca(bocaEntrada: BocaEntrega) {
    this.onSelectBoca.emit(bocaEntrada)
  }
  resetBoca() {
    this.onResetBoca.emit()
  }
  ngOnInit() {
  }
}
