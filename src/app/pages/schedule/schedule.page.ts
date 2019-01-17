import { Component, OnInit } from "@angular/core";
import { ModalController, LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Capacitor, Plugins, KeyboardPlugin } from "@capacitor/core";

import { TournamentService } from "../../services/tournament/tournament.service";
import * as _ from "lodash";

import { ScheduleDetailPage } from "../schedule-detail/schedule-detail.page";

const { Keyboard } = Capacitor.Plugins;


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
    public loadingController: LoadingController,
    public router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.displayLoader().then(async (loader: any) => {
      await this.tournamentService.getTournamentData(68462).subscribe(data => {
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
    });
  }

  async displayLoader() {
    const loading = await this.loadingController.create({
      message: "Getting Teams...",
      spinner: "crescent",
      duration: 1000
    });
    await loading.present();
    return loading;
  }

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
    this.openModal(team);
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

  hideKeyboard(){
    Keyboard.hide();
  }

  onKey(event:any){
    if(event.key ==='Enter'){
      Keyboard.hide();
    }
  }
}
