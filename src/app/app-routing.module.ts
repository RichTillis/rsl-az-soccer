import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { AdminGuard } from "./guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: "register",
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: "forgotPassword",
    loadChildren:
      () => import('./pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: "team", //TODO change to team
    loadChildren: () => import('./pages/team/team.module').then(m => m.TeamPageModule),
    canActivate: [AuthGuard]
  },
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
    loadChildren: () => import('./pages/standings/standings.module').then(m => m.StandingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "about",
    loadChildren: "./pages/about/about.module#AboutPageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "my-teams",
    loadChildren: () => import('./pages/my-teams/my-teams.module').then(m => m.MyTeamsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "teams",
    loadChildren: () => import('./pages/teams/teams.module').then(m => m.TeamsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "field-maps",
    loadChildren: () => import('./pages/field-maps/field-maps.module').then(m => m.FieldMapsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "venues",
    loadChildren: () => import('./pages/venues/venues.module').then(m => m.VenuesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "contact-us",
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "venue-map",
    loadChildren: () => import('./pages/venue-map/venue-map.module').then(m => m.VenueMapPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "inclement-weather",
    loadChildren:
      () => import('./pages/inclement-weather/inclement-weather.module').then(m => m.InclementWeatherPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "announcements",
    loadChildren:
      () => import('./pages/announcements/announcements.module').then(m => m.AnnouncementsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: "notifications",
    loadChildren:
      () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule),
    canActivate: [AuthGuard,AdminGuard]
  },
  // {
  //   path: "notifications",
  //   loadChildren: () =>
  //     import("./pages/notifications/notifications.module").then(
  //       m => m.NotificationsPageModule
  //     ),
  //   canActivate: [AuthGuard, AdminGuard]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
