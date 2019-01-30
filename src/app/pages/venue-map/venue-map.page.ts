import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Capacitor, Plugins, GeolocationPosition } from "@capacitor/core";

import { Observable, of, from as fromPromise } from "rxjs";
import { tap, map, switchMap } from "rxjs/operators";
import * as _ from "lodash";

import { googleMapsApiConfig } from "../../../../google-maps.config";

import { TournamentService } from "../../services/tournament/tournament.service";

const { Toast, Geolocation } = Capacitor.Plugins;

@Component({
  selector: "app-venue-map",
  templateUrl: "./venue-map.page.html",
  styleUrls: ["./venue-map.page.scss"]
})
export class VenueMapPage implements OnInit {
  public coordinates$: Observable<GeolocationPosition>;
  public defaultPostion: { latitude: 32; longitude: 110 }; //Tucson
  public coordinates: any;
  lat: number;
  lng: number;
  zoom: number;
  markerLabel: string;
  fieldName: string;
  venueName: string;
  location: any;

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public tournamentService: TournamentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.fieldName = this.activatedRoute.snapshot.paramMap.get("location");
    this.findLocation();
  }

  ngOnInit() {
    // this.displayLoader()
    //   .then(async (loader: any) => {
    //     try {
    //       const position = await this.getCurrentPosition();
    //       loader.dismiss();
    //       return position;
    //     } catch (err) {
    //       loader.dismiss();
    //       return null;
    //     }
    //   })
    //   .then(position =>
    //     position instanceof Error ? this.presentAlert(position.message) : null
    //   )
    //   .catch(err => {
    //     this.presentAlert(err.message);
    //   });
  }

  async displayLoader() {
    const loading = await this.loadingCtrl.create({
      message: "Loading data...",
      spinner: "crescent",
      duration: 2000
    });
    await loading.present();
    return loading;
  }

  private async presentAlert(message: string): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      header: "Alert",
      subHeader: "Device appears to be offline. Please try again later.",
      message: message,
      buttons: ["OK"]
    });
    await alert.present();
    return alert;
  }

  private async getCurrentPosition(): Promise<any> {
    const isAvailable: boolean = Capacitor.isPluginAvailable("Geolocation");
    if (!isAvailable) {
      console.log("Err: plugin is not available");
      return of(new Error("Err: plugin is not available"));
    }

    const POSITION = Plugins.Geolocation.getCurrentPosition().catch(err => {
      console.log("ERR", err);
      return new Error(err.message);
    });

    this.coordinates$ = fromPromise(POSITION).pipe(
      switchMap((data: any) => of(data.coords)),
      tap(data => console.log(data))
    );
    return POSITION;
  }

  findLocation() {
    this.tournamentService
      .getTournamentLocation(this.fieldName)
      .subscribe(data => {
        this.location = _.map(_.find(data, ["fieldName", this.fieldName]));
        this.coordinates = {
          longitude: Number(this.location[1]),
          latitude: Number(this.location[2])
        };
        this.lat = this.location[1];
        this.lng = this.location[2];
        this.venueName = this.location[3];
        console.log("location", this.location);
      });
  }
}