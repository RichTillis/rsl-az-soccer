import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostCreatePageRoutingModule } from './post-create-routing.module';

import { ComponentsModule } from '../../components/components.module';

import { PostCreatePage } from './post-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostCreatePageRoutingModule,
    ComponentsModule
  ],
  declarations: [PostCreatePage]
})
export class PostCreatePageModule {}
