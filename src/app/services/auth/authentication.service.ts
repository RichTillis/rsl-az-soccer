import { Injectable } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import { auth } from "firebase/app";

import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { Plugins } from '@capacitor/core';

import { BehaviorSubject } from "rxjs";

import { User } from "../../interfaces/user";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    private menu: MenuController,
    private db: AngularFireDatabase
  ) {
    this.menu.enable(false);

    this.afAuth.authState.subscribe(auth => {
      // console.log(auth)
      auth === null ? this.authenticationState.next(false) : this.authenticationState.next(true);
    });

    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     if (user) {
    //       console.log("User already logged in: ", user);
    //       return this.db.object(`users/${user.uid}`).valueChanges();
    //     } else {
    //       console.log("No user logged in.");
    //       return Observable.of(null);
    //     }
    //   })
    // );
  }

  // Returns true if user is logged in
  // get isAuthenticated(): boolean {
  //   return this.authState !== null;
  // }

  // onAuthStateChanged() {
  //   this.afAuth.onAuthStateChanged(user => {
  //     this.authState = user;
  //   });
  // }

  // Returns current user UID
  // get currentUserId(): string {
  //   return this.isAuthenticated ? this.authState.uid : "";
  // }

  get currentUserId(): string {
    return this.authenticationState ? this.getUserId() : "";
  }

  // still needed?
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

  updateUser(user: User) {
    let path = `users/${user.uid}`;
    this.db
      .object(path)
      .update(user)
      .then(() => {
        console.log("user updated");
      });

    // return this.storageControl("set", username, newData);
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async signupUserWithEmailAndPassword({ email, password }): Promise<any>  {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.createNewUserDocumentInFirebase(email, credential.user);
  }

  private createNewUserDocumentInFirebase( email: string, user: firebase.User): Promise<any> {
    // should be server time
    let createDate = new Date().toLocaleDateString();
    const newUser: User = {
      uid: user.uid,
      email: email,
      roles: {
        user: true
      },
      // createDate: firebase.firestore.FieldValue.serverTimestamp(),
      createDate: createDate,
      lastLogin: createDate
    };
    console.log("currentUserId: ", user.uid);
    let path = `users/${user.uid}`;
    return this.db.object(path).update(newUser);
  }

  async signOut() {
    await this.afAuth.signOut();
  }

  private updateUserData(user: firebase.User, email: string) {
    const userRef: AngularFireObject<any> = this.db.object(`users/{user.uid}`);
    let lastLogin = new Date().toLocaleDateString();
    //TODO check if role has been set. If no, set it to 'user'
    const data = {
      lastLogin: lastLogin,
      email: email
    };
    return userRef.update(data);
  }

  signInWithEmailAndPassword({ email, password }) {
    return this.afAuth.signInWithEmailAndPassword(email, password).then((result) => {
      return result;
    });
  }

  // getProfile(): void {
  //   this.facebook
  //     .api("/me?fields=id,name,email", ["public_profile"])
  //     .then(response => {
  //       console.log("getProfile response: ", response);
  //       return response;
  //     });
  // }

  doFacebookLogin(): void {
    let loggedInUser: User = null;

    // this.facebook.getLoginStatus().then(response => {
    //   if (response.status === "connected") {
    //     console.log("user already logged into facebook with this app");
    //     const facebookCredential = auth.FacebookAuthProvider.credential(
    //       response.authResponse.accessToken
    //     );
    //     this.doFirebaseLogin(facebookCredential).then((userCredential: any) => {
    //       loggedInUser = {
    //         uid: userCredential.user.uid,
    //         email: userCredential.additionalUserInfo.profile.email,
    //         lastLogin: new Date().toLocaleDateString(),
    //         profilePic:
    //           userCredential.additionalUserInfo.profile.picture.data.url,
    //         facebookId: userCredential.additionalUserInfo.profile.id
    //       };
    //       this.updateUser(loggedInUser);
    //       this.routeSuccessfulLogin();
    //     });
    //   } else {
    //     console.log("user is not yet logged into facebook");
    //     this.facebook
    //       .login(["public_profile", "email"])
    //       .then(
    //         (res: FacebookLoginResponse) => {
    //           const facebookCredential_1 = firebase.auth.FacebookAuthProvider.credential(
    //             res.authResponse.accessToken
    //           );
    //           this.doFirebaseLogin(facebookCredential_1).then(
    //             (userCredential_1: any) => {
    //               loggedInUser = {
    //                 uid: userCredential_1.user.uid,
    //                 email: userCredential_1.additionalUserInfo.profile.email,
    //                 lastLogin: new Date().toLocaleDateString(),
    //                 profilePic:
    //                   userCredential_1.additionalUserInfo.profile.picture.data
    //                     .url,
    //                 facebookId: userCredential_1.additionalUserInfo.profile.id
    //               };
    //               this.updateUser(loggedInUser);
    //               this.routeSuccessfulLogin();
    //             }
    //           );
    //         },
    //         error => {
    //           console.log(
    //             "Error logging into Facebook" + JSON.stringify(error)
    //           );
    //         }
    //       )
    //       .catch(error_1 => {
    //         console.log("Error logging into Facebook", error_1);
    //       });
    //   }
    // });
  }

  async googleSignup() {
    // null and as any were required at a certain point to fix an issue
    // might be fixed at a future time so check your IDE linting!
    const googleUser = await Plugins.GoogleAuth.signIn(null) as any;

    const credential = auth.GoogleAuthProvider.credential(
      googleUser.authentication.idToken
    );

    const afUser = await this.afAuth.signInWithCredential(credential);

    return this.updateUserData(
      afUser.user,
      googleUser.givenName,
      // googleUser.imageUrl
    );
  }

  getUserId() {
    return auth().currentUser.uid;
  }
}
