import { Injectable } from "@angular/core";
import { ToastController, MenuController } from "@ionic/angular";
import { NavController } from "@ionic/angular";

import { Storage } from "@ionic/storage";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";

import * as firebase from "firebase/app";

import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";

export interface User {
  email: string;
  uid: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  // authenticationState = new BehaviorSubject(false);

  authState: any = null;
  authToken: any = null;

  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    public toastController: ToastController,
    private menu: MenuController,
    private db: AngularFireDatabase,
    public navCtrl: NavController
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  // Returns true if user is logged in
  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

 onAuthStateChanged() {
    this.afAuth.auth.onAuthStateChanged(user => {
      this.authState = user
    });
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : "";
  }

  ngOnInit() {
    this.menu.enable(false);
  }

  storageControl(action, key?, value?) {
    if (action == "set") {
      return this.storage.set(key, value);
    }
    if (action == "get") {
      return this.storage.get(key);
    }
    if (action == "delete") {
      if (!key) {
        // this.displayAlert('Warning', 'About to delete all user data');
        return this.storage.clear();
      } else {
        // this.displayAlert(key, 'Deleting this users data');
        return this.storage.remove(key);
      }
    }
  }

  saveNewUser(username) {
    let path = `users/${this.currentUserId}`;

    let user = {
      creation: new Date().toLocaleDateString(),
      logins: 1,
      rewardCount: 0,
      lastLogin: new Date().toLocaleDateString(),
      id: ""
    };
    this.db
      .object(path)
      .update({
        username: username,
        creation: user.creation,
        logins: user.logins,
        rewardCount: user.rewardCount,
        lastLogin: user.lastLogin
      })
      .then(response => {
        user.id = this.currentUserId;
        return this.storageControl("set", username, user);
      });

    return this.storageControl("get", username);
  }

  updateUser(username, userData) {
    let path = `users/${this.currentUserId}`;

    let newData = {
      creation: userData.creation,
      logins: userData.logins + 1,
      rewardCount: userData.rewardCount,
      lastLogin: new Date().toLocaleDateString(),
      id: userData.id
    };

    this.db.object(path).update(newData);

    return this.storageControl("set", username, newData);
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
    this.navCtrl.navigateForward("");
  }

  async logoutUser() {
    await this.afAuth.auth.signOut();
    this.menu.enable(false);
    // this.authenticationState.next(false);
    console.log("user logged out");
  }

  async doEmailLogin(email: string, password: string) {
    await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    // this.authenticationState.next(true);
    this.menu.enable(true);
    this.storageControl("get", email).then(storedUser => {
      if (!storedUser) {
        console.log("No user found in local storage. Saving new user.");
        this.saveNewUser(email);
        // .then(res => this.displayAlert(username, 'New account saved for this user'));
      } else {
        console.log("User stored in local storage. Updating user.");
        this.updateUser(email, storedUser).then(updated =>
          console.log(email, updated)
        );
      }
    });
    this.navCtrl.navigateForward("");
  }

  async doGoogleLogin() {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    await this.afAuth.auth.signInWithPopup(provider);
    // this.authenticationState.next(true);
  }

  async doFacebookLogin() {
    this.facebook.getLoginStatus().then((response: FacebookLoginResponse) => {
      if (response.status === "connected") {
        console.log("user already logged into facebook with this app");
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );
        this.doFirebaseLogin(facebookCredential);
      } else {
        console.log("user is not yet logged into facebook to sign in");
        this.facebook
          .login(["public_profile", "email"])
          .then(
            (res: FacebookLoginResponse) => {
              console.log("facebook login successfull");
              const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
                res.authResponse.accessToken
              );
              this.doFirebaseLogin(facebookCredential);
            },
            error => {
              console.log(
                "Error logging into Facebook" + JSON.stringify(error)
              );
            }
          )
          .catch(error => {
            console.log("Error logging into Facebook", error);
          });
      }
    });
  }

  private doFirebaseLogin(credential) {
    console.log("Logging in to firebase");
    firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(success => {
        console.log("Firebase login success: " + JSON.stringify(success));
        this.menu.enable(true);
      })
      .catch(error => {
        console.log("Firebase login failure: " + JSON.stringify(error));
      });
  }
}
