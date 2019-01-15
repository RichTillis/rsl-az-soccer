import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicSchedulePage } from './olympic-schedule.page';

describe('OlympicSchedulePage', () => {
  let component: OlympicSchedulePage;
  let fixture: ComponentFixture<OlympicSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlympicSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlympicSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
