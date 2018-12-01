import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Shootout2019PageRoutingModule} from './shootout2019.router.module';

import { Shootout2019Page } from './shootout2019.page';
import { AboutPageModule } from './about/about.module';
import { RulesPageModule } from './rules/rules.module';
import { SchedulePageModule } from './schedule/schedule.module';
import { StandingsPageModule } from './standings/standings.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Shootout2019PageRoutingModule,
    AboutPageModule,
    RulesPageModule,
    SchedulePageModule,
    StandingsPageModule
  ],
  declarations: [Shootout2019Page]
})
export class Shootout2019PageModule {}
