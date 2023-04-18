import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GefcoImporterComponent} from './gefco-importer.component';

describe('GefcoImporterComponent', () => {
  let component: GefcoImporterComponent;
  let fixture: ComponentFixture<GefcoImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GefcoImporterComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GefcoImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
