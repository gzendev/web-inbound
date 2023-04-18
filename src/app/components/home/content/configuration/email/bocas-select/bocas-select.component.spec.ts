import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BocasSelectComponent } from './bocas-select.component';

describe('BocasSelectComponent', () => {
  let component: BocasSelectComponent;
  let fixture: ComponentFixture<BocasSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BocasSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BocasSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
