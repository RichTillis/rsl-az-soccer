import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable } from "rxjs";
import { AuthenticationService } from "../services/auth/authentication.service";
import { take, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && user.roles.admin ? true : false)),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error("Access denied - Admins only");
        }
      })
    );
  }
}
