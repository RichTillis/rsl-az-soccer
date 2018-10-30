import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

// const TOKEN_KEY = "firebase-auth-token";

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

  constructor(private storage: Storage, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.authenticationState.next(true);
        console.log("user is logged in!");
      } else {
        this.authenticationState.next(false);
        console.log("no user logged in");
      }
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

  async resetPassword(email) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(email);
    } catch (error) {
      return error.code;
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async logoutUser() {
    await this.afAuth.auth.signOut();
    // this.storage.remove(TOKEN_KEY).then(() => {
    //   this.authenticationState.next(false);
    // });
  }

  async doEmailLogin(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  async doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    await this.afAuth.auth.signInWithPopup(provider);
    this.authenticationState.next(true);
  }

  async doFacebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    await this.afAuth.auth.signInWithPopup(provider);
    this.authenticationState.next(true);
  }

}
