import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AsignarCuentasRolesComponent} from './asignar-cuentas-roles.component';

describe('AsignarCuentasRolesComponent', () => {
  let component: AsignarCuentasRolesComponent;
  let fixture: ComponentFixture<AsignarCuentasRolesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarCuentasRolesComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarCuentasRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
