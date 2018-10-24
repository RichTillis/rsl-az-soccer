import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardService } from "./services/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: "./home/home.module#HomePageModule",
    canActivate: [AuthGuardService] 
  },
  {
    path: "list",
    loadChildren: "./list/list.module#ListPageModule",
    canActivate: [AuthGuardService] 
  },
  { path: "login", loadChildren: "./login/login.module#LoginPageModule" },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
