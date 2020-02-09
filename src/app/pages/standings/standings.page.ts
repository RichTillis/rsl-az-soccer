import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import * as _ from "lodash";

import { TournamentService } from "../../services/tournament/tournament.service";
import { runInThisContext } from "vm";

@Component({
  selector: "app-standings",
  templateUrl: "./standings.page.html",
  styleUrls: ["./standings.page.scss"]
})
export class StandingsPage implements OnInit {
  public pageTitle: string = "Tournament Standings";
  TOURNAMENT_ID = this.tournamentService.getCurrentTournamentId();
  private allTeamDivisions: any;
  teams = [];
  teamsRendered = [];

  constructor(
    public tournamentService: TournamentService,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.displayLoader().then(async (loader: any) => {
      //   this.tournamentService
      //     .getTournamentData()
      //     .subscribe(data => {
      //       console.log(data);
      //       this.allTeamDivisions = _.chain(data.standings)
      //         .groupBy("flight")
      //         .toPairs()
      //         .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
      //         .value();

      //       this.teams = this.allTeamDivisions;
      //       console.log("teams", this.teams);
      //     });
      // });
      this.tournamentService.tournamentStandingsData$.subscribe((data: any) => {
        this.allTeamDivisions = _.chain(data)
          .groupBy("flight")
          .toPairs()
          .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
          .value();
        this.teams = this.allTeamDivisions;
        this.teamsRendered = this.teams.slice(0, 4);
        console.log(this.teams);
        console.log(this.teamsRendered);
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
}
