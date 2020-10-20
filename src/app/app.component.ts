import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/auth/authentication.service";
import { MenuController, Platform, LoadingController, AlertController, ToastController } from "@ionic/angular";

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
    { title: 'Field Maps', route: '/field-maps', icon: 'map' },
    { title: "Venues", route: "/venues", icon: "pin" },
    { title: "Inclement Weather", route: "/inclement-weather", icon: "rainy" },
    { title: "Contact Us", route: "/contact-us", icon: "mail" },
  ];

  private authState = this.authenticationService.authenticationState.subscribe((data) => {
    console.log('authState. Logged in: ', data);
    const loggedIn = data;
    if (!loggedIn) {
      this.menu.enable(false);
      this.router.navigate(['/']);
    }
    else {
      this.menu.enable(true);
      this.router.navigate(['/home']);
    }
  });

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public platform: Platform,
    private menu: MenuController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    this.menu.enable(false);
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });
  }

  async logout() {
    const loading = await this.loadingController.create();
    await loading.present();

    const logout = this.authenticationService.signOut().then(
      async (res) => {
        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Successfully logged out. See ya next time!',
          duration: 2000
        });

        await toast.present();
      },
      async (err) => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: ':(',
          message: err.message,
          buttons: ['OK'],
        });

        await alert.present();
      });
  }
}
