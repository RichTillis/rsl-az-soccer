import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShootoutPage } from "./shootout.page";
import { AboutPage } from "./about/about.page";
import { RulesPage } from "./rules/rules.page";
import { StandingsPage } from "./standings/standings.page";
import { SchedulePage } from "./schedule/schedule.page";

const routes: Routes = [
  {
    path: "shootout",
    component: ShootoutPage,
    children: [
      {
        path: "",
        redirectTo: "/shootout/(about:about)",
        pathMatch: "full"
      },
      {
        path: "about",
        outlet: "about",
        component: AboutPage
      },
      {
        path: "schedule",
        outlet: "schedule",
        component: SchedulePage
      },
      {
        path: "standings",
        outlet: "standings",
        component: StandingsPage
      },
      {
        path: "rules",
        outlet: "rules",
        component: RulesPage
      }
    ]
  },
  {
    path: "",
    redirectTo: "/shootout/(about:about)",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShootoutPageRoutingModule {}
