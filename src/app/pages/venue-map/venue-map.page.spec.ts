import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueMapPage } from './venue-map.page';

describe('VenueMapPage', () => {
  let component: VenueMapPage;
  let fixture: ComponentFixture<VenueMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
