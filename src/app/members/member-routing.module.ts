import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  {
    path: "tournaments",
    loadChildren: "./tournaments/tournaments.module#TournamentsPageModule"
  },
  {
    path: "2019shootout",
    loadChildren: "./tournaments/shootout/shootout.module#ShootoutPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
