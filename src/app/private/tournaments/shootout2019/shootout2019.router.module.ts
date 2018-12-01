import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { Shootout2019Page } from "./shootout2019.page";
import { AboutPage } from "./about/about.page";
import { RulesPage } from "./rules/rules.page";
import { SchedulePage } from "./schedule/schedule.page";
import { StandingsPage } from "./standings/standings.page";

const routes: Routes = [
  {
    path: "",
    component: Shootout2019Page,
    children: [
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
    redirectTo: "/shootout2019/(about:about)",
    pathMatch: "full"
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Shootout2019PageRoutingModule {}
