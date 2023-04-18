import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatOption, MatSelect} from '@angular/material';

@Component({
  selector: 'app-gefco-mat-filter',
  templateUrl: './gefco-mat-filter.component.html',
  styles: [`
    .gefco-mat-filter {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: white;
    }
  `],
})
export class GefcoMatFilterComponent implements OnInit {

  @Input()
  public set array(array: any[]) {
    if (array) {
      this.filteredArray = array;
      this.originalArray = [...array];
    }
  }

  @Input()
  public placeholder: string;
  @Input()
  public converter: (value: any) => string;

  @ViewChild('filterInput')
  public filterInput: ElementRef<HTMLInputElement>;
  @ViewChild(MatOption)
  public matOption: MatOption;

  public filteredArray: any[];
  public originalArray: any[];

  constructor(@Inject(MatSelect) private matSelect: MatSelect) {

  }

  public ngOnInit(): void {
    this.matOption.disabled = true;
    this.matSelect.openedChange.subscribe((opened: boolean) => {
      if (opened) {
        this.filterInput.nativeElement.focus();
      } else {
        this.reset();
      }
    });
  }

  public filter(search: string): void {
    const filteredArray = this.originalArray.filter((value) => {
      const finalValue = this.converter ? this.converter(value) : value;
      return finalValue.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
    this.filteredArray.splice(0, this.filteredArray.length);
    Array.prototype.push.apply(this.filteredArray, filteredArray);
  }

  public reset(): void {
    this.filterInput.nativeElement.value = '';
    this.filteredArray.splice(0, this.filteredArray.length);
    Array.prototype.push.apply(this.filteredArray, this.originalArray);
  }
}
