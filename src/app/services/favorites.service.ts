import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireDatabase } from "@angular/fire/database";

import { Subscription } from "rxjs/Subscription";

import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root"
})
export class FavoritesService {
  favs = [];
  teamSubscriptions: Map<string, Subscription> = new Map();

  constructor(
    // public http: HttpClient,
    private afDb: AngularFireDatabase,
    public authService: AuthenticationService
  ) {
    console.log("current user id is:");
    console.log(this.authService.currentUserId);
    let path = `/users/${this.authService.currentUserId}/favorites`;
    console.log("getting favorites for path " + path);
    this.afDb.database.ref(path).on("value", snapshot => {
      this.favs = snapshot.val() || [];
      this.favs.map(favorite => this.watchTeam(favorite.team.id));
    });
  }

  hasFavs() {
    return this.favs.length > 0;
  }

  watchTeam(team) {
    let path = `/tournaments/tournaments-data/58671/gamesByTeamId/${team.id}`;
    console.log("watching path " + path);
    let sub = this.afDb
      .list(path)
      .stateChanges()
      .subscribe();

    this.teamSubscriptions.set(team.id, sub);
  }
}
