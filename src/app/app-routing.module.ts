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
    loadChildren: "./public/forgot-password/forgot-password.module#ForgotPasswordPageModule"
  },
  {
    path: "members",
    canActivate: [AuthGuardService],
    loadChildren: "./members/member-routing.module#MemberRoutingModule"
  }

  // {
  //   path: "list",
  //   loadChildren: "./list/list.module#ListPageModule",
  //   canActivate: [AuthGuardService]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
