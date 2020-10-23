import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostCreatePageRoutingModule } from './post-create-routing.module';

import { PostCreatePage } from './post-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostCreatePageRoutingModule
  ],
  declarations: [PostCreatePage]
})
export class PostCreatePageModule {}
