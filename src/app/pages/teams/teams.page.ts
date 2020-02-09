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
  public pageTitle: string = "Tournament Schedule";
  // private allTeams: any;
  private allTeamDivisions: any;
  divisionFilter = "all";

  teams = [];
  teamsRendered = [];

  queryText: string;

  constructor(
    public tournamentService: TournamentService,
    public loadingController: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
    this.displayLoader().then(async (loader: any) => {

      // this.tournamentService.getTournamentData().subscribe(data => {
      //   // console.log(data);
      //   // this.allTeams = data.teams;
      //   this.allTeamDivisions = _.chain(data.teams)
      //     .groupBy("flight")
      //     .toPairs()
      //     .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
      //     .value();
      //   this.teams = this.allTeamDivisions;
      //   console.log("division teams", this.teams);
      // });
      this.tournamentService.tournamentTeamData$.subscribe((data: any) => {
        this.allTeamDivisions = _.chain(data)
          .groupBy("flight")
          .toPairs()
          .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
          .value();
        this.teams = this.allTeamDivisions;
        console.log(this.teams)
        this.teamsRendered = this.teams.slice(0, 4);
      });
    })
  }

  displayMoreTeams(event: any) {
    let undisplayedDivisionCount = this.teams.length - this.teamsRendered.length;

    if(undisplayedDivisionCount > 0){
      // console.log('teams length', this.teams.length);      
      // console.log('rends length', this.teamsRendered.length);
      let numberOfDivisionsToAdd = undisplayedDivisionCount < 4 ? undisplayedDivisionCount : 4;
      // console.log('divs to add ', numberOfDivisionsToAdd);
      let newDivisions = this.teams.slice(this.teamsRendered.length , this.teamsRendered.length + numberOfDivisionsToAdd);
      // console.log('more divisions ', newDivisions);
      this.teamsRendered = this.teamsRendered.concat(newDivisions);
      // console.log(this.teamsRendered);
    }
    
    event.target.complete();
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
    this.teamsRendered = this.teams.slice(0, 4);

    console.log("division teams", this.teams);
  }

  hideKeyboard() {
    Keyboard.hide();
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      Keyboard.hide();
    }
  }
}
