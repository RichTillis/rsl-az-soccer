import { Injectable } from "@angular/core";
import { ToastController, MenuController } from "@ionic/angular";

import { Storage } from "@ionic/storage";
import { BehaviorSubject } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";

import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";

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

  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    public toastController: ToastController,
    private menu: MenuController,
  ) {
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

  ngOnInit() {
    this.menu.enable(false);
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
    this.menu.enable(false);
    // this.storage.remove(TOKEN_KEY).then(() => {
    //   this.authenticationState.next(false);
    // });
  }

  async doEmailLogin(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.authenticationState.next(true);
    this.menu.enable(true);
  }

  async doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    await this.afAuth.auth.signInWithPopup(provider);
    this.authenticationState.next(true);
  }

  async doFacebookLogin() {
    this.facebook
      .login(["public_profile", "email"])
      .then((res: FacebookLoginResponse) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          res.authResponse.accessToken
        );

        firebase
          .auth()
          .signInWithCredential(facebookCredential)
          .then(success => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.authenticationState.next(true);
            this.menu.enable(true);
          })
          .catch(error => {
            console.log("Firebase failure: " + JSON.stringify(error));
          });
      })
      .catch(error => {
        console.log("Error logging into Facebook", error);
      });
  }
}
