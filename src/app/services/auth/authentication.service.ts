import { Injectable } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Router } from "@angular/router";

import { Storage } from "@ionic/storage";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireObject } from "@angular/fire/database";
import * as firebase from "firebase/app";

import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";

import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";

import { User } from "../../interfaces/user";
import { Firebase } from "@ionic-native/firebase/ngx";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  // authenticationState = new BehaviorSubject(false);

  user$: Observable<User>;

  authState: any = null;

  constructor(
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    private menu: MenuController,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.menu.enable(false);

    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          console.log("User already logged in: ", user);
          return this.db.object(`users/${user.uid}`).valueChanges();
        } else {
          console.log("No user logged in.");
          return Observable.of(null);
        }
      })
    );
  }

  // ngOnInit() {
  //   this.menu.enable(false);
  // }

  // Returns true if user is logged in
  get isAuthenticated(): boolean {
    return this.authState !== null;
  }

  onAuthStateChanged() {
    this.afAuth.onAuthStateChanged(user => {
      this.authState = user;
    });
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : "";
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

  private saveNewUser(userCredential: any, username: string) {
    console.log("currentUserId: ", this.currentUserId);
    let path = `users/${this.currentUserId}`;

    let user: User = {
      createDate: new Date().toLocaleDateString(),
      lastLogin: new Date().toLocaleDateString(),
      uid: userCredential.uid,
      email: username,
      roles: {
        user: true
      }
    };
    this.db
      .object(path)
      .update({
        username: user.email,
        roles: user.roles
      })
      .then(() => {
        user.uid = this.currentUserId;
        return this.storageControl("set", username, user);
      });

    return this.storageControl("get", username);
  }

  // updateUser(username, userData) {
  //   let path = `users/${this.currentUserId}`;
  //   console.log("userData", userData);

  //   let newData = {
  //     createDate: userData.createDate,
  //     // logins: 1,
  //     // rewardCount: 0,

  //     lastLogin: new Date().toLocaleDateString(),
  //     // logins: userData.logins + 1,
  //     // rewardCount: userData.rewardCount,
  //     // lastLogin: new Date().toLocaleDateString(),
  //     // id: userData.id,
  //     uid: userData.id,
  //     email: username
  //   };

  //   // this.db.object(path).update(newData);

  //   return this.storageControl("set", username, newData);
  // }
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

  async resetPassword(email: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      return error.code;
    }
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    // console.log("Success. Credential: ", credential.user);
    this.createNewUserDocumentInFirebase(email, credential.user);
    this.routeSuccessfulLogin();
    // this.saveNewUser(credential, email);
    // this.updateUserData(credential.user, email);
  }

  private createNewUserDocumentInFirebase(
    email: string,
    user: firebase.User
  ): void {
    let createDate = new Date().toLocaleDateString();
    const newUser: User = {
      uid: user.uid,
      email: email,
      roles: {
        user: true
      },
      createDate: createDate,
      lastLogin: createDate
    };
    console.log("currentUserId: ", user.uid);
    let path = `users/${user.uid}`;
    this.db.object(path).update(newUser);
  }

  async logoutUser() {
    await this.afAuth.signOut();
    this.menu.enable(false);
    // this.authenticationState.next(false);
    console.log("user logged out");
  }

  loginWithEmail(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        this.updateUserData(credential.user, email);
      });
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

  canRead(user: User): boolean {
    const allowed = ["admin", "director", "user"];
    return this.checkAuthorization(user, allowed);
  }

  canPost(user: User): boolean {
    const allowed = ["admin", "director"];
    return this.checkAuthorization(user, allowed);
  }

  canUpdateUser(user: User): boolean {
    const allowed = ["admin"];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }

  async doEmailLogin(email: string, password: string) {
    console.log("Trying email login.");
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential: any) => {
        let loggedInUser: User = {
          uid: userCredential.user.uid,
          email: email,
          lastLogin: new Date().toLocaleDateString()
        };
        this.updateUser(loggedInUser);
        this.routeSuccessfulLogin();

        // this.storageControl("get", email).then(storedUser => {
        //   if (!storedUser) {
        //     console.log("No user found in local storage. Saving new user.");
        //     this.saveNewUser(credential.user, email);
        //     // .then(res => this.displayAlert(username, 'New account saved for this user'));
        //   } else {
        //     console.log("User stored in local storage. Updating user.");
        //     // this.updateUser(email, storedUser).then(updated =>
        //     //   console.log(email, updated)
        //     // );
        //     const loggedInUser: User = {
        //       lastLogin: new Date().toLocaleDateString(),
        //       // logins: userData.logins + 1,
        //       // rewardCount: userData.rewardCount,
        //       // lastLogin: new Date().toLocaleDateString(),
        //       // id: userData.id,
        //       uid: userData.id,
        //       email: email
        //     };
        //     this.updateUser(email, storedUser).then(updated =>
        //       console.log(email, updated)
        //     );
        //   }
        // });
      });
    // this.authenticationState.next(true);
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

    // const response = await this.facebook.getLoginStatus();
    this.facebook.getLoginStatus().then(response => {
      if (response.status === "connected") {
        console.log("user already logged into facebook with this app");
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          response.authResponse.accessToken
        );
        this.doFirebaseLogin(facebookCredential).then((userCredential: any) => {
          loggedInUser = {
            uid: userCredential.user.uid,
            email: userCredential.additionalUserInfo.profile.email,
            lastLogin: new Date().toLocaleDateString(),
            profilePic:
              userCredential.additionalUserInfo.profile.picture.data.url,
            facebookId: userCredential.additionalUserInfo.profile.id
          };
          this.updateUser(loggedInUser);
          this.routeSuccessfulLogin();
        });
      } else {
        console.log("user is not yet logged into facebook");
        this.facebook
          .login(["public_profile", "email"])
          .then(
            (res: FacebookLoginResponse) => {
              const facebookCredential_1 = firebase.auth.FacebookAuthProvider.credential(
                res.authResponse.accessToken
              );
              this.doFirebaseLogin(facebookCredential_1).then(
                (userCredential_1: any) => {
                  loggedInUser = {
                    uid: userCredential_1.user.uid,
                    email: userCredential_1.additionalUserInfo.profile.email,
                    lastLogin: new Date().toLocaleDateString(),
                    profilePic:
                      userCredential_1.additionalUserInfo.profile.picture.data
                        .url,
                    facebookId: userCredential_1.additionalUserInfo.profile.id
                  };
                  this.updateUser(loggedInUser);
                  this.routeSuccessfulLogin();
                }
              );
            },
            error => {
              console.log(
                "Error logging into Facebook" + JSON.stringify(error)
              );
            }
          )
          .catch(error_1 => {
            console.log("Error logging into Facebook", error_1);
          });
      }
    });
  }

  async doFirebaseLogin(credential: firebase.auth.AuthCredential) {
    return firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .then(response => {
        this.menu.enable(true);
        return response;
      })
      .catch(error => {
        console.log("Firebase login failure: " + JSON.stringify(error));
      });
  }

  private routeSuccessfulLogin() {
    this.menu.enable(true);
    this.router.navigateByUrl("/home");
  }
}
