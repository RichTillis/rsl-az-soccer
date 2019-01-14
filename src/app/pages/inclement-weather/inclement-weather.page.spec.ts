import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InclementWeatherPage } from './inclement-weather.page';

describe('InclementWeatherPage', () => {
  let component: InclementWeatherPage;
  let fixture: ComponentFixture<InclementWeatherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InclementWeatherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InclementWeatherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
