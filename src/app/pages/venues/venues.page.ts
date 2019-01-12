import { Component, OnInit } from "@angular/core";

import * as _ from "lodash";

import { TournamentService } from "../../services/tournament/tournament.service";

@Component({
  selector: "app-venues",
  templateUrl: "./venues.page.html",
  styleUrls: ["./venues.page.scss"]
})
export class VenuesPage implements OnInit {
  private SHOOTOUT_ID = 68462;
  locations: any;

  constructor(public tournamentService: TournamentService) {}

  ngOnInit() {
    this.tournamentService
      .getTournamentGameLocations(this.SHOOTOUT_ID)
      .subscribe(data => {
        this.locations = _.map(_.uniqBy(data, "location"), "location").sort();
        console.log("locations", this.locations);
      });
  }
}
