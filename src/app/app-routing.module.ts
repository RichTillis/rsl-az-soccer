import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

// Send unauthorized users to login
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/introduction']);

// Automatically log in users
const redirectLoggedInToApp = () => redirectLoggedInTo(['/home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'introduction',
    pathMatch: 'full',
  },
  {
    path: 'introduction',
    ...canActivate(redirectLoggedInToApp),
    loadChildren: () => import('./pages/introduction/introduction.module').then( m => m.IntroductionPageModule)
  },
  {
    path: "home",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: "team", //TODO change to team
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/team/team.module').then(m => m.TeamPageModule),
  },
  {
    path: "rules",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: "./pages/rules/rules.module#RulesPageModule",
  },
  {
    path: "schedule",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: "./pages/schedule/schedule.module#SchedulePageModule",
  },
  {
    path: "standings",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/standings/standings.module').then(m => m.StandingsPageModule),
  },
  {
    path: "about",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: "./pages/about/about.module#AboutPageModule",
  },
  {
    path: "my-teams",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/my-teams/my-teams.module').then(m => m.MyTeamsPageModule),
  },
  {
    path: "teams",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/teams/teams.module').then(m => m.TeamsPageModule),
  },
  {
    path: "field-maps",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/field-maps/field-maps.module').then(m => m.FieldMapsPageModule),
  },
  {
    path: "venues",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/venues/venues.module').then(m => m.VenuesPageModule),
  },
  {
    path: "contact-us",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsPageModule),
  },
  {
    path: "venue-map",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/venue-map/venue-map.module').then(m => m.VenueMapPageModule),
  },
  {
    path: "inclement-weather",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren:
      () => import('./pages/inclement-weather/inclement-weather.module').then(m => m.InclementWeatherPageModule),
  },
  {
    path: "announcements",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren:
      () => import('./pages/announcements/announcements.module').then(m => m.AnnouncementsPageModule),
  },
  {
    path: "notifications",
    ...canActivate(redirectUnauthorizedToLogin),
    loadChildren:
      () => import('./pages/notifications/notifications.module').then(m => m.NotificationsPageModule),
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
export class AppRoutingModule { }
