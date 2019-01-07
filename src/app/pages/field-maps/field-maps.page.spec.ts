import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMapsPage } from './field-maps.page';

describe('FieldMapsPage', () => {
  let component: FieldMapsPage;
  let fixture: ComponentFixture<FieldMapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldMapsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldMapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
