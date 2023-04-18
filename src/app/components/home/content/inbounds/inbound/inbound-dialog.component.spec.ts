import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {InboundDialogComponent} from './inbound-dialog.component';

describe('InboundComponent', () => {
  let component: InboundDialogComponent;
  let fixture: ComponentFixture<InboundDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InboundDialogComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboundDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
