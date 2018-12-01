import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: "./public/login/login.module#LoginPageModule"
  },
  {
    path: "register",
    loadChildren: "./public/register/register.module#RegisterPageModule"
  },
  {
    path: "forgotPassword",
    loadChildren:
      "./public/forgot-password/forgot-password.module#ForgotPasswordPageModule"
  },
  {
    path: "home",
    canActivate: [AuthGuardService],
    loadChildren: "./private/home/home.module#HomePageModule"
  },
  {
    path: "tournaments",
    canActivate: [AuthGuardService],
    loadChildren:
      "./private/tournaments/tournaments.module#TournamentsPageModule"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
