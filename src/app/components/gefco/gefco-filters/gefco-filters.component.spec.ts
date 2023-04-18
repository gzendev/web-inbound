import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GefcoFiltersComponent} from './gefco-filters.component';

describe('GefcoFiltersComponent', () => {
  let component: GefcoFiltersComponent;
  let fixture: ComponentFixture<GefcoFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GefcoFiltersComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GefcoFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
