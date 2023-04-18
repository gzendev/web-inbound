import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcesionariaSelectComponent } from './concesionaria-select.component';

describe('ConcesionariaSelectComponent', () => {
  let component: ConcesionariaSelectComponent;
  let fixture: ComponentFixture<ConcesionariaSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcesionariaSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcesionariaSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
