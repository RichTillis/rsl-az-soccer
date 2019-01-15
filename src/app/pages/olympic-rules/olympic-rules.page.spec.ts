import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlympicRulesPage } from './olympic-rules.page';

describe('OlympicRulesPage', () => {
  let component: OlympicRulesPage;
  let fixture: ComponentFixture<OlympicRulesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlympicRulesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlympicRulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
