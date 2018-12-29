import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { TeamPage } from './team.page';
import { TeamPageRoutingModule } from './team.routing.module';

import { TeamDetailsPageModule } from './team-details/team-details.module';
import { TeamSchedulePageModule } from './team-schedule/team-schedule.module';
import { TeamStandingsPageModule } from './team-standings/team-standings.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    TeamDetailsPageModule,
    TeamSchedulePageModule,
    TeamStandingsPageModule,
    TeamPageRoutingModule
  ],
  declarations: [TeamPage]
})
export class TeamPageModule {}
