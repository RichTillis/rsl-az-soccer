import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TeamPage } from "./team.page";

const routes: Routes = [
  {
    path: "",
    component: TeamPage,
    children: [
      {
        path: "teamDetails",
        children: [
          {
            path: "",
            loadChildren:
              "./team-details/team-details.module#TeamDetailsPageModule"
          },
          {
            path: ":id",
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
        path: ":id",
        redirectTo: "/teamDetails/:id",
        pathMatch: "full"
      }
    ]
  },
  {
    path: ":id",
    redirectTo: "/teamDetails/:id",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamPageRoutingModule {}
