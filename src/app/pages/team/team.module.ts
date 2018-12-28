import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeamPage } from './team.page';
import { TeamPageRoutingModule } from './team.routing.module';


const routes: Routes = [
  {
    path: '',
    component: TeamPage
  },
  {
    path: ':id',
    component: TeamPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamPageRoutingModule
  ],
  declarations: [TeamPage]
})
export class TeamPageModule {}
