import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuesPage } from './venues.page';

describe('VenuesPage', () => {
  let component: VenuesPage;
  let fixture: ComponentFixture<VenuesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
