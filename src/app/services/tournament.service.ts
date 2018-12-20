import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import "rxjs/add/observable/of";

@Injectable({
  providedIn: "root"
})
export class TournamentService {
  private baseUrl = "https://ftlowellrush.firebaseio.com";
  currentTourney: any = {};
  currentVenueLocations: any = {};
  private tourneyData = {};
  private locations = {};

  // private shootoutId = 68462;

  constructor(public http: HttpClient) {}

  getTournaments() {
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments/tournaments.json`).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  getTournamentData(tourneyId, forceRefresh: boolean = true): Observable<any> {
    console.log("Getting tournament data for: " + tourneyId);
    if (!forceRefresh && this.tourneyData[tourneyId]) {
      this.currentTourney = this.tourneyData[tourneyId];
      console.log("**no need to make HTTP call, just return the data");
      return Observable.of(this.currentTourney);
    }

    // don't have data yet
    console.log("don't have data yet");
    console.log(
      `${this.baseUrl}/tournaments/tournaments-data/${tourneyId}.json`
    );
    console.log("**about to make HTTP call");
    return this.http
      .get(
        `${this.baseUrl}/tournaments/tournaments-data/${tourneyId}.json`
      )
      .pipe(
        map(response => {
          this.tourneyData[tourneyId] = response;
          this.currentTourney = this.tourneyData[tourneyId];
          return this.currentTourney;
        })
      );
  }

  getTournamentGameLocations(
    tourneyId,
    forceRefresh: boolean = false
  ): Observable<any> {
    console.log("Getting tournament game location data for: " + tourneyId);
    console.log(
      `${this.baseUrl}/tournaments/tournaments-data/${tourneyId}/games.json`
    );
    console.log("**about to make HTTP call");
    return this.http
      .get(
        `${this.baseUrl}/tournaments/tournaments-data/${tourneyId}/games.json`
      )
      .pipe(
        map(response => {
          this.tourneyData[tourneyId] = response;
          this.currentVenueLocations = this.tourneyData[tourneyId];
          return this.currentVenueLocations;
        })
      );
  }

  getTournamentLocations() {
    return [
      {
        name: "Kino Sports Park Headquarters",
        latitude: 32.175515,
        longitude: -110.934761
      },
      {
        name: "Townsend Middle School",
        latitude: 32.248369,
        longitude: -110.878146
      },
      { name: "Udall Park", latitude: 32.249524, longitude: -110.838629 },
      {
        name: "Doolen Middle School",
        latitude: 32.251202,
        longitude: -110.925589
      },
      { name: "Freedom Park", latitude: 32.1995, longitude: -110.885816 },
      { name: "Golf Links Park", latitude: 32.19517, longitude: -110.877023 }
    ];
  }

  getTournamentLocation() {
    return this.http.get(`${this.baseUrl}/tournaments/venues.json`).pipe(
      map(response => {
        this.locations[0] = response;
        this.currentVenueLocations = this.locations[0];
        return this.currentVenueLocations;
      })
    );
  }

  getCurrentTourney() {
    return this.currentTourney;
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }
}
