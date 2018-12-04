import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import { AuthenticationService } from "../services/authentication.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public auth: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const isLoggedIn = this.auth.isAuthenticated;
    console.log('isLoggedIn: ' +isLoggedIn);
    
    if (!isLoggedIn) {
      this.router.navigateByUrl("/login");
    }
    return true;
  }
}
