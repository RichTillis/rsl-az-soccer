import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamsPage } from './my-teams.page';

describe('MyTeamsPage', () => {
  let component: MyTeamsPage;
  let fixture: ComponentFixture<MyTeamsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTeamsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
