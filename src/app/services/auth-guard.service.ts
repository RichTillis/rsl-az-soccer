import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, public auth: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // console.log(route);

    // let authInfo = {
    //   authenticated: false
    // };

    // if (!authInfo.authenticated) {
    //   this.router.navigate(["login"]);
    //   return false;
    // }

    // return true;

    return this.auth.isAuthenticated();

    // return true;
  }
}
