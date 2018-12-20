import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import _ from "lodash";

import { TournamentService } from "../../services/tournament.service";

@Component({
  selector: "app-team",
  templateUrl: "./team.page.html",
  styleUrls: ["./team.page.scss"]
})
export class TeamPage implements OnInit {
  teamId: string;
  allGames: any[];
  // dateFilter: string;
  games: any[];
  // isFollowing = false;
  // team: any;
  teamStanding: any;
  private tourneyData: any;
  // useDateFilter = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.teamId = this.activatedRoute.snapshot.paramMap.get("id");
    console.log(this.teamId);

    console.log("loading team data for " + this.teamId);
    this.tourneyData = this.tournamentService.getCurrentTourney();

    console.log(this.tourneyData);

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
          homeAway: isHome ? "vs." : "at"
        };
      })
      .value();

    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, {
      teamId: this.teamId
    });
    console.log(this.teamStanding);
    // this.isFollowing = this.favoriteService.isFav(this.team);
  }

  getScoreDisplay(isHome, homeScore, awayScore) {
    console.log("getting score display");
    console.log("home score:" + homeScore);
    console.log("away score:" + awayScore);
    console.log("is home: " + isHome);

    if (homeScore != null && awayScore != null) {
      var teamScore = isHome ? homeScore : awayScore;
      var opponentScore = isHome ? awayScore : homeScore;
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";

      console.log("team score:" + teamScore);
      console.log("opponent score:" + opponentScore);
      console.log("win indicator:" + winIndicator);

      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }
}
