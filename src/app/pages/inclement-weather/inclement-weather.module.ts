import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InclementWeatherPage } from './inclement-weather.page';

const routes: Routes = [
  {
    path: '',
    component: InclementWeatherPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InclementWeatherPage]
})
export class InclementWeatherPageModule {}
