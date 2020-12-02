import { Injectable, NgZone } from "@angular/core";
import { Platform } from "@ionic/angular";
import * as firebase from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "@angular/fire/database";
import { auth } from "firebase/app";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import '@codetrix-studio/capacitor-google-auth';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../interfaces/user";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentFirebaseUser$: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);
  usersRef: AngularFireList<User>;
  users$: Observable<User[]>;
  constructor(
    private afAuth: AngularFireAuth,
    private facebook: Facebook,
    private db: AngularFireDatabase,
    private zone: NgZone,
    private platform: Platform
  ) {
    this.usersRef = db.list('users');
    this.users$ = this.usersRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

    // Do we need this AND the init()?? No but I can't get it to work without both
    this.afAuth.authState.subscribe(auth => {
      console.log('log in status: ', auth);
      if (auth === null) {
        this.authenticationState.next(false);
        this.currentFirebaseUser$.next(null);
      } else {
        this.authenticationState.next(true);
        this.currentFirebaseUser$.next(auth)
      }
    });

    this.afAuth.onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });

  }
  init(): void {
    this.afAuth.onAuthStateChanged(firebaseUser => {
      this.zone.run(() => {
        firebaseUser ? this.loggedIn.next(true) : this.loggedIn.next(false);
      });
    });
  }

  updateUser(user: User) {
    let path = `users/${user.uid}`;
    this.db
      .object(path)
      .update(user)
      .then(() => {
        console.log("user updated");
      });
  }

  resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  async signupUserWithEmailAndPassword({ email, password }): Promise<any> {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    console.log('what did i get back? ', credential);
    if (credential !== null) {
      console.log('login success. Routing now');
      this.authenticationState.next(true);
    }
    return this.createNewUserDocumentInFirebase(email, credential.user);
  }

  private createNewUserDocumentInFirebase(email: string, user: firebase.User): Promise<any> {
    // should be server time
    let createDate = new Date().toLocaleDateString();
    const newUser: User = {
      uid: user.uid,
      email: email,
      role: 'user',
      // createDate: firebase.firestore.FieldValue.serverTimestamp(),
      createDate: createDate,
      lastLogin: createDate
    };
    console.log("currentUserId: ", user.uid);
    let path = `users/${user.uid}`;
    return this.db.object(path).update(newUser);
  }

  async signOut() {
    const logOutResult = await this.afAuth.signOut();
    this.authenticationState.next(false);
    console.log('signout - logged out');
    // this.router.navigate(['/']);
  }

  private updateUserData(user: firebase.User, email: string) {
    const userRef: AngularFireObject<any> = this.db.object(`users/${user.uid}`);
    let lastLogin = new Date().toLocaleDateString();
    //TODO check if role has been set. If no, set it to 'user'
    const data = {
      lastLogin: lastLogin,
      email: email
    };
    return userRef.update(data);
  }

  async signInWithEmailAndPassword({ email, password }) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    if (userCredential) {
      this.authenticationState.next(true);
    }
    return userCredential;
  }

  // getProfile(): void {
  //   this.facebook
  //     .api("/me?fields=id,name,email", ["public_profile"])
  //     .then(response => {
  //       console.log("getProfile response: ", response);
  //       return response;
  //     });
  // }

  facebookLogin(): void {
    if (this.platform.is("capacitor")) {
      this.nativeFacebookAuth();
    } else {
      this.browserFacebookAuth();
    }
  }

  async nativeFacebookAuth(): Promise<void> {
    try {
      const facebookLoginResponse = await this.facebook.login(["public_profile", "email"]);

      console.log(facebookLoginResponse);

      if (facebookLoginResponse.authResponse) {
        // User is signed-in Facebook.
        const unsubscribe = firebase.auth().onAuthStateChanged(async firebaseUser => {
          unsubscribe();
          // Check if we are already signed-in Firebase with the correct user.
          if (!this.isUserEqual(facebookLoginResponse.authResponse, firebaseUser)) {
            // Build Firebase credential with the Facebook auth token.
            const credential = firebase.auth.FacebookAuthProvider.credential(
              facebookLoginResponse.authResponse.accessToken
            );
            // Sign in with the credential from the Facebook user.
            const afUser = await this.afAuth.signInWithCredential(credential);
            if (afUser !== null) {
              console.log('facebook login success. Routing now');
              this.authenticationState.next(true);
            }
            const fbUserId = facebookLoginResponse.authResponse.userID;
            const faceBookUserData = await this.getFacebookUserData(fbUserId);
            console.log('faceBookUserData: ', faceBookUserData);
            return this.updateUserData(
              afUser.user,
              faceBookUserData.email
              //faceBookUserData.picture.data.url,
              //faceBookUserData.name
            );
          } else {
            // User is already signed-in Firebase with the correct user.
            console.log("already signed in");
          }
        });
      } else {
        // User is signed-out of Facebook.
        firebase.auth().signOut();
      }
    } catch (err) {
      console.log(err);
    }
  }

  getFacebookUserData(fbUserId: string): Promise<any> {
    return this.facebook.api('/' + fbUserId + '/?fields=id,email,name,picture', ['public_profile'])
      .then(apiResponse => {
        console.log('graphQl response: ', apiResponse);
        return apiResponse;
      })
      .catch(e => {
        console.log(e);
      });
  }

  async browserFacebookAuth(): Promise<void> {
    const provider = new firebase.auth.FacebookAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  }

  isUserEqual(facebookAuthResponse, firebaseUser): boolean {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;

      providerData.forEach(data => {
        if (
          data.providerId === firebase.auth.FacebookAuthProvider.PROVIDER_ID &&
          data.uid === facebookAuthResponse.userID
        ) {
          // We don't need to re-auth the Firebase connection.
          return true;
        }
      });
    }

    return false;
  }

  async googleSignup() {
    // null and as any were required at a certain point to fix an issue
    // might be fixed at a future time so check your IDE linting!
    const googleUser = await Plugins.GoogleAuth.signIn(null) as any;

    console.log('Google auth response: ', googleUser);
    const credential = auth.GoogleAuthProvider.credential(
      googleUser.authentication.idToken
    );

    const afUser = await this.afAuth.signInWithCredential(credential);
    if (afUser !== null) {
      console.log('google login success. Routing now');
      this.authenticationState.next(true);
    }
    return this.updateUserData(
      afUser.user,
      googleUser.givenName,
      // googleUser.imageUrl
    );
  }

  getUserId() {
    return auth().currentUser.uid;
  }

  get currentUserId(): string {
    return this.authenticationState ? this.getUserId() : "";
  }

}
