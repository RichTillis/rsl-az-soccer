import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OlympicSchedulePage } from './olympic-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: OlympicSchedulePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OlympicSchedulePage]
})
export class OlympicSchedulePageModule {}
