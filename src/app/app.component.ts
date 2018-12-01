import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";

import { AuthenticationService } from "./services/authentication.service";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['home']);
        } else {
          this.router.navigate(["login"]);
        }
      });
    });
  }

  logout(){
    this.authenticationService.logoutUser();
  }
}
