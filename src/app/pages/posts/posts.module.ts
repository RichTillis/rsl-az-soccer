import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostsPageRoutingModule } from './posts-routing.module';

import { ComponentsModule } from '../../components/components.module';

import { PostsPage } from './posts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PostsPage]
})
export class PostsPageModule {}
