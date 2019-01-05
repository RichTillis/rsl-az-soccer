import { Injectable } from "@angular/core";
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
    private afDb: AngularFireDatabase,
    public authService: AuthenticationService
  ) {
    let path = `/users/${this.authService.currentUserId}/favorites`;
    this.afDb.database.ref(path).on("value", snapshot => {
      this.favs = snapshot.val() || [];
    });
  }

  getFavorites() {
    let path = `/users/${this.authService.currentUserId}/favorites`;
    return this.afDb.list(path).valueChanges();
  }

  watchTeam(team) {
    let path = `/tournaments/tournaments-data/68462/gamesByTeamId/${team.id}`;
    console.log("watching path " + path);
    let sub = this.afDb
      .list(path)
      .stateChanges()
      .subscribe();

    this.teamSubscriptions.set(team.id, sub);
  }

  isFav(team) {
    let favReducer = (accumulator, currentVal) =>
      accumulator ? true : team.teamId === currentVal.team.teamId;
    return this.favs.reduce(favReducer, false);
  }

  removeFav(team) {
    let teamFilter = item => {
      return team.teamId !== item.team.teamId;
    };

    let newFavs = this.favs.filter(teamFilter);

    let path = `/users/${this.authService.currentUserId}/favorites`;
    this.afDb.database.ref(path).set(newFavs);
  }

  addFav(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };

    this.favs.push(item);
    let path = `/users/${this.authService.currentUserId}/favorites`;
    this.afDb
      .object(path)
      .set(this.favs)
      .catch(er => {
        console.log("error:");
        console.log(er);
      });
  }
}
