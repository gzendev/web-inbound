import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SaveEmailDialogComponent} from './save-email-dialog.component';

describe('SaveEmailDialogComponent', () => {
  let component: SaveEmailDialogComponent;
  let fixture: ComponentFixture<SaveEmailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SaveEmailDialogComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
