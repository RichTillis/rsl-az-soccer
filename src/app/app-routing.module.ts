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
    path: "app",
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
  {
    path: "field-maps",
    loadChildren: "./pages/field-maps/field-maps.module#FieldMapsPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "venues",
    loadChildren: "./pages/venues/venues.module#VenuesPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "check-in",
    loadChildren: "./pages/check-in/check-in.module#CheckInPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "contact-us",
    loadChildren: "./pages/contact-us/contact-us.module#ContactUsPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "venue-map",
    loadChildren: "./pages/venue-map/venue-map.module#VenueMapPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "inclement-weather",
    loadChildren:
      "./pages/inclement-weather/inclement-weather.module#InclementWeatherPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: 'olympic-schedule', loadChildren: './pages/olympic-schedule/olympic-schedule.module#OlympicSchedulePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'olympic-volunteers', loadChildren: './pages/olympic-volunteers/olympic-volunteers.module#OlympicVolunteersPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'olympic-maps', loadChildren: './pages/olympic-maps/olympic-maps.module#OlympicMapsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'olympic-rules', loadChildren: './pages/olympic-rules/olympic-rules.module#OlympicRulesPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'announcements', loadChildren: './pages/announcements/announcements.module#AnnouncementsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
