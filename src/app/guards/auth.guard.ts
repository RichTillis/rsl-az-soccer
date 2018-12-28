import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import * as firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  loggedIn: any;

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user: firebase.User) => {
        if (user) {
          resolve(true);
        } else {
          console.log("User is not logged in");
          this.router.navigate(["/login"]);
          resolve(false);
        }
      });
    });
  }
}
