import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Capacitor, Plugins, KeyboardPlugin } from "@capacitor/core";

import { TournamentService } from "../../services/tournament/tournament.service";
import * as _ from "lodash";

const { Keyboard } = Capacitor.Plugins;

@Component({
  selector: "app-teams",
  templateUrl: "./teams.page.html",
  styleUrls: ["./teams.page.scss"]
})
export class TeamsPage implements OnInit {
  private allTeams: any;
  private allTeamDivisions: any;
  divisionFilter = "all";

  teams = [];
  queryText: string;

  constructor(
    public tournamentService: TournamentService,
    public loadingController: LoadingController,
    public router: Router
  ) {  }

  ngOnInit() {
    this.displayLoader().then(async (loader: any) => {
      let tournamentId = this.tournamentService.getCurrentTournamentId();
      await this.tournamentService.getTournamentData(tournamentId).subscribe(data => {
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
