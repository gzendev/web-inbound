import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TelefonoDialogComponent} from './telefono-dialog.component';

describe('TelefonoDialogComponent', () => {
  let component: TelefonoDialogComponent;
  let fixture: ComponentFixture<TelefonoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TelefonoDialogComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelefonoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
