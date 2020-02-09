import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, ParamMap } from "@angular/router";
import _ from "lodash";

import { TournamentService } from "../../../services/tournament/tournament.service";
import { FavoritesService } from "../../../services/favorites/favorites.service";

@Component({
  selector: "app-team-schedule",
  templateUrl: "./team-schedule.page.html",
  styleUrls: ["./team-schedule.page.scss"]
})
export class TeamSchedulePage implements OnInit {
  public pageTitle: string = "Team Schedule";
  teamId: string;
  games: any[];
  isFollowing = false;
  team: any;
  teamStanding: any;
  private tourneyData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public tournamentService: TournamentService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.teamId = params.get("teamId");
      this.tournamentService.setTeamId(this.teamId);
    });
    // this.activatedRoute.parent.params.subscribe((params: Params) => {
    // console.log(params);
    // this.teamId = params.teamId;
    // this.tournamentService.setTeamId(this.teamId);
    // });
    console.log("loading team data for " + this.teamId);
    this.tournamentService.getTournamentData().subscribe(data => {
      console.log(data);
      this.tourneyData = data;

      let team = _.chain(this.tourneyData.teams)
        .filter(t => t.id === this.teamId)
        .map(t => {
          return {
            teamId: t.id,
            flight: t.flight,
            teamName: t.name
          };
        })
        .value();
      this.team = team[0];

      this.games = _.chain(this.tourneyData.games)
        .filter(
          g => g.homeTeamId === this.teamId || g.awayTeamId === this.teamId
        )
        .map(g => {
          let isHome = g.homeTeamId === this.teamId;
          let opponentName = isHome ? g.awayTeam : g.homeTeam;
          let scoreDisplay = this.getScoreDisplay(
            isHome,
            g.homeScore,
            g.awayScore
          );
          return {
            gameId: g.id,
            opponent: opponentName,
            time: Date.parse(g.time),
            location: g.location,
            locationUrl: g.locationUrl,
            scoreDisplay: scoreDisplay,
            homeAway: isHome ? "home" : "away",
            vsAt: isHome ? "" : "at"
          };
        })
        .value();

      this.teamStanding = _.find(this.tourneyData.standings, {
        teamId: this.teamId
      });

      this.isFollowing = this.favoritesService.isFav(this.team);
    });
  }

  getScoreDisplay(isHome, homeScore, awayScore) {
    if (homeScore != null && awayScore != null) {
      var teamScore = isHome ? homeScore : awayScore;
      var opponentScore = isHome ? awayScore : homeScore;
      var winIndicator = teamScore > opponentScore ? "WIN " : "LOSS ";
      if (teamScore == opponentScore) {
        winIndicator = "DRAW ";
      }
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
    console.log("remove from favs");
    this.isFollowing = false;
    this.favoritesService.removeFav(this.team);
  }
}
