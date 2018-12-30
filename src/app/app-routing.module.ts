import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  // { path: "", redirectTo: "home", pathMatch: "full" },

  {
    path: "",
    loadChildren: "./pages/home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    loadChildren: "./pages/home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: "./pages/auth/login/login.module#LoginPageModule"
  },
  {
    path: "register",
    loadChildren: "./pages/auth/register/register.module#RegisterPageModule"
  },
  {
    path: "forgotPassword",
    loadChildren:
      "./pages/auth/forgot-password/forgot-password.module#ForgotPasswordPageModule"
  },
  {
    path: "team",
    loadChildren: "./pages/team/team.module#TeamPageModule",
    canActivate: [AuthGuard]
  },
  // {
  //   path: "",
  //   loadChildren: "./pages/team/team.module#TeamPageModule",
  //   canActivate: [AuthGuard]
  // },
  {
    path: "rules",
    loadChildren: "./pages/rules/rules.module#RulesPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "schedule",
    loadChildren: "./pages/schedule/schedule.module#SchedulePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "standings",
    loadChildren: "./pages/standings/standings.module#StandingsPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "about",
    loadChildren: "./pages/about/about.module#AboutPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "my-teams",
    loadChildren: "./pages/my-teams/my-teams.module#MyTeamsPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "teams",
    loadChildren: "./pages/teams/teams.module#TeamsPageModule",
    canActivate: [AuthGuard]
  },
  { path: 'field-maps', loadChildren: './field-maps/field-maps.module#FieldMapsPageModule' },
  { path: 'venues', loadChildren: './venues/venues.module#VenuesPageModule' },
  { path: 'check-in', loadChildren: './check-in/check-in.module#CheckInPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
