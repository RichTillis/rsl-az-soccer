import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostCreatePage } from './post-create.page';

describe('PostCreatePage', () => {
  let component: PostCreatePage;
  let fixture: ComponentFixture<PostCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCreatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
