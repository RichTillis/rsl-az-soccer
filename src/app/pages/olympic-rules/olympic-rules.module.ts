import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OlympicRulesPage } from './olympic-rules.page';

const routes: Routes = [
  {
    path: '',
    component: OlympicRulesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OlympicRulesPage]
})
export class OlympicRulesPageModule {}
