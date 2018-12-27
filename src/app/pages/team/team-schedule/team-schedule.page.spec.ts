import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamSchedulePage } from './team-schedule.page';

describe('TeamSchedulePage', () => {
  let component: TeamSchedulePage;
  let fixture: ComponentFixture<TeamSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
