import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TeamPage } from "./team.page";
import { TeamDetailsPage } from './team-details/team-details.page';

const routes: Routes = [
  {
    path: "",
    component: TeamPage,
    children: [
      {
        path: "teamDetails",
        children: [
          // {
          //   path: '',
          //   component: TeamDetailsPage
          // },
          {
            path: ":teamId",
            loadChildren:
              "./team-details/team-details.module#TeamDetailsPageModule"
          }
        ]
      },
      {
        path: "teamSchedule",
        children: [
          {
            path: "",
            loadChildren:
              "./team-schedule/team-schedule.module#TeamSchedulePageModule"
          }
        ]
      },
      {
        path: "teamStandings",
        children: [
          {
            path: "",
            loadChildren:
              "./team-standings/team-standings.module#TeamStandingsPageModule"
          }
        ]
      },
      {
        path: "",
        redirectTo: "team/teamDetails",
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
