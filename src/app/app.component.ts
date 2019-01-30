import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
import { UtilService } from "./services/util/util.service";
import { FcmService } from "./services/push-notifications/fcm.service";
import { AuthenticationService } from "./services/auth/authentication.service";
import { Platform } from "@ionic/angular";

import { ToastController } from "@ionic/angular";
import { tap } from "rxjs/operators";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public menuItems = [
    {name:'Home', route:'/home', icon:'home'},
    {name:'My Teams', route:'/my-teams', icon:'star'},
    {name:'Schedule', route:'/schedule', icon:'calendar'},
    {name:'Standings', route:'/standings', icon:'trophy'},
    {name:'Field Maps', route:'/field-maps', icon:'map'},
    {name:'Venues', route:'/venues', icon:'pin'},
    {name:'Tournament Info', route:'about', icon:'information-circle'},
    {name:'Inclement Weather', route:'/inclement-weather', icon:'rainy'},
    {name:'Contact Us', route:'/contact-us', icon:'mail'}
  ];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private utilService: UtilService,
    private fcm: FcmService,
    public toastCtrl: ToastController,
    platform: Platform
  ) {
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });
    platform.ready().then(() => {
      // if (platform.is("ios") || platform.is("android")) {
      try {
        this.fcm.init();
      } catch (err) {
        console.warn(err);
      }

      // }
    });
  }

  async presentNotifications(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  logout() {
    this.authenticationService.logoutUser();
    this.utilService.displayOkAlert(
      "Log Out Successful",
      null,
      "See ya next time"
    );
    this.router.navigateByUrl("/login");
  }
}
