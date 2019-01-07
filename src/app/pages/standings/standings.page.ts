import { Component, OnInit } from "@angular/core";
import * as _ from "lodash";

import { TournamentService } from "../../services/tournament/tournament.service";

@Component({
  selector: "app-standings",
  templateUrl: "./standings.page.html",
  styleUrls: ["./standings.page.scss"]
})
export class StandingsPage implements OnInit {
  TOURNAMENT_ID = 68462;
  teams = [];

  constructor(private tournamentService: TournamentService) {
    tournamentService.getTournamentData(this.TOURNAMENT_ID).subscribe(data => {
      this.teams = _.chain(data.standings)
        .groupBy("flight")
        .toPairs()
        .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
        .value();
      // console.log("teams", this.teams);
    });
  }

  ngOnInit() {}
}
