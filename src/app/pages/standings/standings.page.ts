import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

import { TournamentService } from "../../services/tournament.service";

@Component({
  selector: "app-standings",
  templateUrl: "./standings.page.html",
  styleUrls: ["./standings.page.scss"]
})
export class StandingsPage implements OnInit {
  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string;
  standings: any[];

  constructor(private tournamentService: TournamentService) {
    tournamentService.getTournamentData(68462).subscribe(data => {
      console.log(data);
      this.allTeams = data.teams;
      this.allTeamDivisions = _.chain(data.standings)
        .groupBy("flight")
        .toPairs()
        .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
        .value();

      this.teams = this.allTeamDivisions
      console.log("teams", this.teams);
    });
  }

  ngOnInit() {
    // let tourneyData = this.tournamentService.getTournamentData(68462);
    // console.log(tourneyData);
    // this.standings = tourneyData.standings;
    // console.log(this.standings);
  }
}
