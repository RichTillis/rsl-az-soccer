import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Router } from "@angular/router";
import { Capacitor } from "@capacitor/core";

import { TournamentService } from "../../services/tournament/tournament.service";
import { LoadingService } from "../../services/loading/loading.service";

import * as _ from "lodash";
import { EMPTY, zip, of, Subject, combineLatest, Observable } from 'rxjs';

import { catchError, toArray, mergeMap, groupBy, map, tap, startWith } from "rxjs/operators";
import { Team } from "../../interfaces/team";

const { Keyboard } = Capacitor.Plugins;

@Component({
  selector: "app-teams",
  templateUrl: "./teams.page.html",
  styleUrls: ["./teams.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsPage implements OnInit {
  private segmentSelectedSubject = new Subject<string>();
  segmentSelectedAction$ = this.segmentSelectedSubject.asObservable();

  // tournamentTeams$ = combineLatest(
  //   this.tournamentService.tournamentTeams$,
  //   this.segmentSelectedAction$.pipe(startWith('Boy'))
  // )
  //   .pipe(
  //     map(([tournamentTeams, segmentSelection]) =>
  //       // tournamentTeams.filter(team => segmentSelection ? team.name.includes(segmentSelection) : true)),
  //       tournamentTeams.filter(team => team.name.includes('Boy') )),

  //     // mergeMap(item => item),
  //     // groupBy(team => team.flight),
  //     // mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
  //     // toArray(),
  //     catchError(err => {
  //       this.errorMessage = err;
  //       return EMPTY;
  //     })
  //   )

  // TODO figure out how to transform the zip array into an object with divisionName and Teams array 
  tournamentTeams$ = this.tournamentService.tournamentTeams$
    .pipe(
      // tap(items => console.log(items)),
      // map(teams => teams.filter(team => team.flight.includes('Boy'))),
      // tap(items => console.log(items)),
      mergeMap(item => item),
      groupBy(team => team.flight),
      mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
      toArray(),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  private allTeams: any;
  private allTeamDivisions: any;
  divisionFilter = "all";
  errorMessage = '';
  teams = [];
  queryText: string;

  constructor(
    public tournamentService: TournamentService,
    public loadingController: LoadingController,
    private loadingService: LoadingService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.displayLoader();

    // this.tournamentTeams$.subscribe(val => console.log(val));

    // this.tournamentService.getTournamentData().subscribe(data => {
    //   console.log("teams page", data);
    //   this.allTeams = data.teams;
    //   this.allTeamDivisions = _.chain(data.teams)
    //     .groupBy("flight")
    //     .toPairs()
    //     .map(item => _.zipObject(["divisionName", "divisionTeams"], item))
    //     .value();
    //   this.teams = this.allTeamDivisions;
    //   console.log("division teams", this.teams);
    // });
  }

  displayLoader() {
    this.loadingService.present({
      message: "Getting Teams . . .",
      duration: 1000
    });
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
    // this.filterDivisions(ev.detail.value);
    if (ev.detail.value === 'All') {
      this.segmentSelectedSubject.next(null);
    }
    else {
      this.segmentSelectedSubject.next(ev.detail.value);
    }

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

  hideKeyboard() {
    Keyboard.hide();
  }

  onKey(event: any) {
    if (event.key === 'Enter') {
      Keyboard.hide();
    }
  }
}
