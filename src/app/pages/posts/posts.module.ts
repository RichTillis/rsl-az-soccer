import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { ComponentsModule } from '../../components/components.module';

import { PostsPage } from './posts.page';
import { PostEditPageModule } from '../post-edit/post-edit.module';
import { PostCreatePageModule } from '../post-create/post-create.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    ComponentsModule,
    PostEditPageModule,
    PostCreatePageModule
  ],
  declarations: [PostsPage]
})
export class PostsPageModule {}
