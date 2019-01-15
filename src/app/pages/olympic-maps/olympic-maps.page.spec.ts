import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicMapsPage } from './olympic-maps.page';

describe('OlympicMapsPage', () => {
  let component: OlympicMapsPage;
  let fixture: ComponentFixture<OlympicMapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlympicMapsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlympicMapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
