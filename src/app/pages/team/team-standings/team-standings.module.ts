import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';

import { TeamStandingsPage } from './team-standings.page';

const routes: Routes = [
  {
    path: '',
    component: TeamStandingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [TeamStandingsPage]
})
export class TeamStandingsPageModule {}
