import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PermisosRolComponent} from './permisos-rol.component';

describe('PermisosRolComponent', () => {
  let component: PermisosRolComponent;
  let fixture: ComponentFixture<PermisosRolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PermisosRolComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermisosRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
