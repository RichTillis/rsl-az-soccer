import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
import { UtilService } from "./services/util/util.service";
import { FcmService } from "./services/push-notifications/fcm.service";
import { AuthenticationService } from "./services/auth/authentication.service";
import { Platform } from "@ionic/angular";

import { ToastController } from "@ionic/angular";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public menuItems = [
    { title: "Home", route: "/home", icon: "home" },
    { title: "My Teams", route: "/my-teams", icon: "star" },
    { title: "Schedule", route: "/teams", icon: "calendar" },
    { title: "Standings", route: "/standings", icon: "trophy" },
    // {name:'Field Maps', route:'/field-maps', icon:'map'},
    { title: "Venues", route: "/venues", icon: "pin" },
    {
      title: "Tournament Info",
      route: "https://rslazsoccer.com/jacobs-classic/",
      icon: "information-circle"
    },
    { title: "Inclement Weather", route: "/inclement-weather", icon: "rainy" },
    { title: "Contact Us", route: "/contact-us", icon: "mail" }
  ];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private utilService: UtilService,
    private fcm: FcmService,
    public toastCtrl: ToastController,
    public platform: Platform
  ) {
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });
    platform.ready().then(() => {
      // if(this.platform.is('ios') || this.platform.is('android')){
      //   try {
      //     this.fcm.init();
      //   } catch (err) {
      //     console.warn(err);
      //   }
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

  isLoggedIn(): boolean {
    return true;
  }

  logout(): void {
    this.authenticationService.logoutUser();
    this.utilService.displayOkAlert(
      "Log Out Successful",
      null,
      "See ya next time"
    );
    this.router.navigateByUrl("/login");
  }
}
