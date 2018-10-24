import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage, private platform: Platform) {
    this.platform.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }
  login() {
    return this.storage.set(TOKEN_KEY, "Bearer 1234567").then(() => {
      this.authenticationState.next(true);
    });
  }
  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
  isAuthenticated(){
    return this.authenticationState.value;
  }
}
