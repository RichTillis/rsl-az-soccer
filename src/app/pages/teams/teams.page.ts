import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { TournamentService } from "../../services/tournament.service";
import * as _ from "lodash";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string;

  constructor(
    public tournamentService: TournamentService,
    public router: Router
  ) {
    tournamentService.getTournamentData(68462).subscribe(data => {
      console.log(data);
      this.allTeams = data.teams;
      this.allTeamDivisions = _.chain(data.teams)
        .groupBy("flight")
        .toPairs()
        .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
        .value();

      this.teams = this.allTeamDivisions;
      console.log("division teams", this.teams);
    });
  }

  ngOnInit() {}

  updateTeams() {
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t =>
        (<any>t).name.toLowerCase().includes(queryTextLower)
      );
      if (teams.length) {
        filteredTeams.push({
          divisionName: td.divisionName,
          divisionTeams: teams
        });
      }
    });

    this.teams = filteredTeams;
  }

  teamTapped($event, team): void {
    console.log(team);
    this.router.navigate(['/team',	{	id:	team.id	}]);
  }

}
