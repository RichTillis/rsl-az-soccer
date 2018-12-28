import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root"
})
export class UserService {
  authState: any = null;

  constructor(
    private afAuth: AngularFireAuth,
    private storage: Storage,
    private fbDb: AngularFireDatabase
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : "";
  }
}
