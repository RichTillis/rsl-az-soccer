import { Component, OnInit } from "@angular/core";

import _ from "lodash";

import { TournamentService } from "../../../services/tournament/tournament.service";
import { FavoritesService } from "../../../services/favorites/favorites.service";

@Component({
  selector: "app-team-standings",
  templateUrl: "./team-standings.page.html",
  styleUrls: ["./team-standings.page.scss"]
})
export class TeamStandingsPage implements OnInit {
  public pageTitle: string = "Team Standings";
  TOURNAMENT_ID = this.tournamentService.getCurrentTournamentId();
  divisionFilter = "flight";
  flightStandings: any[];
  standingsByBracket: any = {};
  team: any;
  teamId: string;
  isFollowing = false;
  private tourneyData: any;

  constructor(
    private tournamentService: TournamentService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.teamId = this.tournamentService.getTeamId();

    console.log("loading team data for " + this.teamId);
    this.tournamentService
      .getTournamentData()
      .subscribe(data => {
        this.tourneyData = data;
        this.team = _.filter(data.teams, t => t.id === this.teamId);
        this.team = this.team[0];

        this.isFollowing = this.favoritesService.isFav(this.team);

        this.flightStandings = _.filter(
          data.standings,
          s => s.flight === this.team.flight
        );
        console.log(this.flightStandings)
        
        this.flightStandings.map(team => {
          (this.standingsByBracket[team['bracket']] = this.standingsByBracket[team['bracket']] || []).push(team)
        })
        console.log(this.standingsByBracket)
        
      });
  }

  getScoreDisplay(isHome, homeScore, awayScore) {
    if (homeScore != null && awayScore != null) {
      let teamScore = isHome ? homeScore : awayScore;
      let opponentScore = isHome ? awayScore : homeScore;
      let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }

  addToFavs() {
    console.log("add to fav");
    this.isFollowing = true;
    this.favoritesService.addFav(
      this.team,
      this.tourneyData.tournament.id,
      this.tourneyData.tournament.name
    );
  }

  removeFromFavs() {
    console.log('remove from favs');
    this.isFollowing = false;
    this.favoritesService.removeFav(this.team);
  }
}
