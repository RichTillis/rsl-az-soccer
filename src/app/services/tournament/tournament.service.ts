import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, groupBy, tap, catchError, filter, mergeMap } from "rxjs/operators";
import "rxjs/add/observable/of";

import { Team } from '../../interfaces/team';

@Injectable({
  providedIn: "root"
})
export class TournamentService {
  private readonly baseUrl = "https://ftlowellrush.firebaseio.com";
  currentTourney: any = {};
  currentVenueLocations: any = {};

  private tourneyData = {};
  private locations = {};

  private tournamentData: any = {};
  currentTournament: Observable<any>;

  teamId;

  private readonly CURRENT_TOURNAMENT_ID = 70432;
  // private readonly CURRENT_TOURNAMENT_ID = 74306;

  tournamentTeams$ = this.http.get<Team[]>(`${this.baseUrl}/tournaments/tournaments-data/${this.CURRENT_TOURNAMENT_ID}/teams.json`)
    .pipe(
      // tap(items => console.log(items)),

      // map(teams =>
      //   teams.map(team =>
      //     ({
      //       ...team
      //     }) as Team)),

      // tap(data => console.log('Teams: ', JSON.stringify(data))),
      catchError(this.handleError)
    );

  constructor(public http: HttpClient) { }

  getTeamId() {
    return this.teamId;
  }

  getCurrentTournamentId() {
    return this.CURRENT_TOURNAMENT_ID;
  }

  setTeamId(newTeamId) {
    this.teamId = newTeamId;
  }

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

  getTournamentData(forceRefresh: boolean = true): Observable<any> {
    console.log("Getting tournament data for: " + this.CURRENT_TOURNAMENT_ID);
    if (!forceRefresh && this.tourneyData[this.CURRENT_TOURNAMENT_ID]) {
      this.currentTourney = this.tourneyData[this.CURRENT_TOURNAMENT_ID];
      console.log("**no need to make HTTP call, just return the data");
      return Observable.of(this.currentTourney);
    }

    // don't have data yet
    console.log("don't have data yet");
    console.log(
      `${this.baseUrl}/tournaments/tournaments-data/${this.CURRENT_TOURNAMENT_ID}.json`
    );
    console.log("**about to make HTTP call");
    return this.http
      .get(`${this.baseUrl}/tournaments/tournaments-data/${this.CURRENT_TOURNAMENT_ID}.json`)
      .pipe(
        map(response => {
          this.tourneyData[this.CURRENT_TOURNAMENT_ID] = response;
          this.currentTourney = this.tourneyData[this.CURRENT_TOURNAMENT_ID];
          return this.currentTourney;
        })
      );
  }

  getTournamentGameLocations(
    tourneyId: number,
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
      { name: "Kino Sports Park Headquarters", longitude: 32.175515, latitude: -110.934761 },
      { name: "Townsend Middle School", longitude: 32.248369, latitude: -110.878146 },
      { name: "Udall Park", longitude: 32.249524, latitude: -110.838629 },
      { name: "Golf Links Park", longitude: 32.19517, latitude: -110.877023 },
      { name: "Jacobs Park", longitude: 32.2761846, latitude: -111.0132731 },
      { name: "Ochoa Park", longitude: 32.2696305, latitude: -110.9877275 },
      { name: "Doolen Middle School", longitude: 32.2507277, latitude: -110.9285953 },
      { name: "Freedom Park", longitude: 32.199299, latitude: -110.888453 },
      { name: "Willie Blake Community Park", longitude: 32.1837732, latitude: -110.9404694 },
      { name: "Himmel Park", longitude: 32.2339533, latitude: -110.9353475 },
    ];
  }

  getTournamentLocation(venueLocation) {
    return this.http.get(`${this.baseUrl}/tournaments/venues.json`).pipe(
      map(response => {
        this.locations[0] = response;
        this.currentVenueLocations = this.locations[0];
        return this.currentVenueLocations;
      })
    );
  }

  getCurrentTourney() {
    if (this.currentTourney === null) {
      return this.getTournamentData();
    }
    return this.currentTourney;
  }

  refreshCurrentTourney() {
    return this.getTournamentData(true);
  }

  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
