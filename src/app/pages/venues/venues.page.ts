import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";

import * as _ from "lodash";

import { TournamentService } from "../../services/tournament/tournament.service";

@Component({
  selector: "app-venues",
  templateUrl: "./venues.page.html",
  styleUrls: ["./venues.page.scss"]
})
export class VenuesPage implements OnInit {
  public pageTitle: string = "Venues";
  private SHOOTOUT_ID = this.tournamentService.getCurrentTournamentId();
  locations: any;

  constructor(
    public loadingController: LoadingController,
    public tournamentService: TournamentService
  ) {}

  ngOnInit() {
    this.displayLoader().then(async (loader: any) => {
      await this.tournamentService
        .getTournamentGameLocations(this.SHOOTOUT_ID)
        .subscribe(data => {
          this.locations = _.map(_.uniqBy(data, "location"), "location").sort();
          console.log("locations", this.locations);
        });
    });
  }

  async displayLoader() {
    const loading = await this.loadingController.create({
      message: "Getting Venues...",
      spinner: "crescent",
      duration: 1000
    });
    await loading.present();
    return loading;
  }
}
