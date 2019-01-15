import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OlympicMapsPage } from './olympic-maps.page';

const routes: Routes = [
  {
    path: '',
    component: OlympicMapsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OlympicMapsPage]
})
export class OlympicMapsPageModule {}
