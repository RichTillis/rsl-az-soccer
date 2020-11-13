import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostEditPageRoutingModule } from './post-edit-routing.module';

import { ComponentsModule } from '../../components/components.module';

import { PostEditPage } from './post-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PostEditPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PostEditPage]
})
export class PostEditPageModule {}
