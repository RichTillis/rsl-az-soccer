import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import * as _ from "lodash";

import { TournamentService } from "../../services/tournament/tournament.service";

@Component({
  selector: "app-standings",
  templateUrl: "./standings.page.html",
  styleUrls: ["./standings.page.scss"]
})
export class StandingsPage implements OnInit {
  TOURNAMENT_ID = this.tournamentService.getCurrentTournamentId();
  private allTeamDivisions: any;
  teams = [];

  constructor(
    public tournamentService: TournamentService,
    public loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.displayLoader().then(async (loader: any) => {
      await this.tournamentService
        .getTournamentData()
        .subscribe(data => {
          console.log(data);
          this.allTeamDivisions = _.chain(data.standings)
            .groupBy("flight")
            .toPairs()
            .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
            .value();

          this.teams = this.allTeamDivisions;
          console.log("teams", this.teams);
        });
    });
  }

  async displayLoader() {
    const loading = await this.loadingController.create({
      message: "Getting Teams...",
      spinner: "crescent",
      duration: 2000
    });
    await loading.present();
    return loading;
  }

  segmentChanged(ev: any) {
    console.log("Segment changed", ev.detail.value);
    this.filterDivisions(ev.detail.value);
  }

  filterDivisions(filter: string) {
    if (filter !== "All") {
      let filteredTeams = _.filter(this.allTeamDivisions, division => {
        return division.divisionName.includes(filter);
      });
      this.teams = filteredTeams;
    } else {
      this.teams = this.allTeamDivisions;
    }

    console.log("division teams", this.teams);
  }
}
