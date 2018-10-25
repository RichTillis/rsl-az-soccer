import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

// const TOKEN_KEY = "auth-token";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  auth$ = this.afAuth.authState.pipe(
    tap(next => {
      if (!next) {
        // this.store.set("user", null);
        this.authenticationState.next(false);
        return;
      }
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.authenticationState.next(true);
      // this.store.set("user", user);
    })
  );

  constructor(
    private storage: Storage,
    private platform: Platform,
    private afAuth: AngularFireAuth
  ) {
    this.platform.ready().then(() => {
      // this.checkToken();
    });
  }

  // checkToken() {
  //   this.storage.get(TOKEN_KEY).then(res => {
  //     if (res) {
  //       this.authenticationState.next(true);
  //     }
  //   });
  // }
  // login() {
  //   return this.storage.set(TOKEN_KEY, "Bearer 1234567").then(() => {
  //     this.authenticationState.next(true);
  //   });
  // }
  // logout() {
  //   return this.storage.remove(TOKEN_KEY).then(() => {
  //     this.authenticationState.next(false);
  //   });
  // }
  isAuthenticated() {
    return this.authenticationState.value;
  }

  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  createUserWithEmailAndPassword(email: string, password: string) {
    this.authenticationState.next(true);
    
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logoutUser() {
    this.authenticationState.next(false);
    return this.afAuth.auth.signOut();
  }

  async doEmailLogin(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.authenticationState.next(true);
  }

  doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    return this.afAuth.auth.signInWithPopup(provider).then(() => {
      this.authenticationState.next(true);
    });
  }

  doFacebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(() => {
      this.authenticationState.next(true);
    });
  }

  // doTwitterLogin() {
  //   let provider = new firebase.auth.TwitterAuthProvider();
  //   return this.afAuth.auth.signInWithPopup(provider);
  // }
}
