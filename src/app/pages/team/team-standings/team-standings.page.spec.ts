import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamStandingsPage } from './team-standings.page';

describe('TeamStandingsPage', () => {
  let component: TeamStandingsPage;
  let fixture: ComponentFixture<TeamStandingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamStandingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamStandingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
