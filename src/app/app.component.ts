import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
import { UtilService } from "./services/util.service";

import { AuthenticationService } from "./services/authentication.service";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private utilService: UtilService
  ) {
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });
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
