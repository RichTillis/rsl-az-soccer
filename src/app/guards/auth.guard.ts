import { Injectable, NgZone } from "@angular/core";
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

  constructor(private router: Router, private ngZone: NgZone) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      //TODO - some kind of method prob after ionic 5 / angular 10 / firebase 6 update
      resolve(true);
      // firebase.auth().onAuthStateChanged((user: firebase.User) => {
      //   if (user) {
      //     resolve(true);
      //   } else {
      //     console.log("User is not logged in");
      //     this.ngZone.run(() => this.router.navigateByUrl("/login"));
      //     //this.router.navigateByUrl("/login");
      //     resolve(false);
      //   }
      // });
    });
  }
}
