import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Shootout2019Page } from './shootout2019.page';

describe('Shootout2019Page', () => {
  let component: Shootout2019Page;
  let fixture: ComponentFixture<Shootout2019Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Shootout2019Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Shootout2019Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
