import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreatePage } from './post-create.page';

describe('PostCreatePage', () => {
  let component: PostCreatePage;
  let fixture: ComponentFixture<PostCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
