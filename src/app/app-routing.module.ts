import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  // { path: "", redirectTo: "home", pathMatch: "full" },

  {
    path: "",
    loadChildren: "./private/home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
  {
    path: "home",
    loadChildren: "./private/home/home.module#HomePageModule",
    canActivate: [AuthGuard]
  },
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
  { path: 'shootout', loadChildren: './private/shootout/shootout.module#ShootoutPageModule' },
  { path: '', loadChildren: './private/shootout/shootout.module#ShootoutPageModule' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
