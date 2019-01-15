import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicVolunteersPage } from './olympic-volunteers.page';

describe('OlympicVolunteersPage', () => {
  let component: OlympicVolunteersPage;
  let fixture: ComponentFixture<OlympicVolunteersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlympicVolunteersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlympicVolunteersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
