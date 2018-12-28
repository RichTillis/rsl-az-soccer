import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

import { TournamentService } from "../../services/tournament.service";
import * as _ from "lodash";

import { ScheduleDetailPage } from "../schedule-detail/schedule-detail.page";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.page.html",
  styleUrls: ["./schedule.page.scss"]
})
export class SchedulePage implements OnInit {
  private allTeams: any;
  private allTeamDivisions: any;
  teams = [];
  queryText: string;

  constructor(
    public tournamentService: TournamentService,
    public router: Router,
    private modalController: ModalController
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

  async openModal(team) {
    const modal = await this.modalController.create({
      component: ScheduleDetailPage,
      componentProps: {
        teamId: team.id
      }
    });
    await modal.present();
  }

  teamTapped($event, team): void {
    // console.log(team);
    this.openModal(team);
    // this.router.navigate(['/team/teamSchedule',	{	id:	team.id	}]);
  }
}
