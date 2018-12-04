import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ShootoutPage } from "./shootout.page";
import { ShootoutPageRoutingModule } from "./shootout.routing.module";

import { RulesPageModule } from "./rules/rules.module";
import { AboutPageModule } from "./about/about.module";
import { SchedulePageModule } from "./schedule/schedule.module";
import { StandingsPageModule } from "./standings/standings.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShootoutPageRoutingModule,
    RulesPageModule,
    AboutPageModule,
    SchedulePageModule,
    StandingsPageModule
  ],
  declarations: [ShootoutPage]
})
export class ShootoutPageModule {}
