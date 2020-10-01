import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TeamPage } from "./team.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TeamPage,
    children: [
      {
        path: "teamSchedule",
        children: [
          {
            path: ":teamId",
            loadChildren:
              () => import('./team-schedule/team-schedule.module').then(m => m.TeamSchedulePageModule)
          }
        ]
      },
      {
        path: "teamStandings",
        children: [
          {
            path: "",
            loadChildren:
              () => import('./team-standings/team-standings.module').then(m => m.TeamStandingsPageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "app/tabs/teamSchedule",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamPageRoutingModule {}
