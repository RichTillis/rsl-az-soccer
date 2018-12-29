import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import _ from "lodash";

import { TournamentService } from "../../../services/tournament.service";

@Component({
  selector: "app-team-standings",
  templateUrl: "./team-standings.page.html",
  styleUrls: ["./team-standings.page.scss"]
})
export class TeamStandingsPage implements OnInit {
  TOURNAMENT_ID = 68462;
  // teams = [];
  divisionFilter = "flight";
  flightStandings: any[];
  allStandings: any[];
  team: any;
  currentTournament: any = {};

  teamId: string;
  // isFollowing = false;
  private tournamentData: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private tournamentService: TournamentService
  ) {}

  ngOnInit() {
    // this.teamId = this.activatedRoute.snapshot.paramMap.get("id");
    // console.log(this.teamId);
    console.log("team standings:");
    this.teamId = this.tournamentService.getTeamId();
    console.log(this.teamId);

    console.log("loading team data for " + this.teamId);
    this.tournamentService
      .getTournamentData(this.TOURNAMENT_ID)
      .subscribe(data => {
        console.log('returned data:');
        console.log(data);

        this.team = _.filter(data.teams, t => t.id === this.teamId);
        this.team = this.team[0];
        console.log("current team");
        console.log(this.team);

        this.flightStandings = _.filter(data.standings,s => s.flight === this.team.flight);
        console.log("current flight");
        console.log(this.flightStandings);
      });
    
    // this.tournamentService.getTournamentData(this.TOURNAMENT_ID).subscribe(data => {
    //   this.allStandings  = _.chain(data.standings)
    //     .groupBy("flight")
    //     .toPairs()
    //     .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
    //     .value();
    //   console.log("standings", this.allStandings);
    // });
    // console.log("current tournament data:");
    // console.log(this.currentTournament);
    // this.allStandings = this.tournamentData.standings;
    // this.standings = _.filter(this.allStandings, s => s.flight === this.team.flight);
    // console.log(this.standings);
  }

  getScoreDisplay(isHome, homeScore, awayScore) {
    // console.log("getting score display");
    // console.log("home score:" + homeScore);
    // console.log("away score:" + awayScore);
    // console.log("is home: " + isHome);

    if (homeScore != null && awayScore != null) {
      var teamScore = isHome ? homeScore : awayScore;
      var opponentScore = isHome ? awayScore : homeScore;
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";

      // console.log("team score:" + teamScore);
      // console.log("opponent score:" + opponentScore);
      // console.log("win indicator:" + winIndicator);

      return winIndicator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }
  }
}
