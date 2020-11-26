import { Component, OnInit } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "./services/auth/authentication.service";
import { MenuController, Platform, LoadingController, AlertController, ToastController } from "@ionic/angular";
import { map, tap } from "rxjs/operators";
import { User } from "./interfaces/user";
import { menuItems } from './app-menu-items';

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  allowedMenuItems = [];

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
    this.authenticationService.init();
    
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });

    this.authenticationService.authenticationState.subscribe(user => {
      if (user) {
        this.menu.isOpen().then(data => {
          if (!data) {
            this.menu.enable(true);
          }
        });
        this.router.navigate(['/home']);
      }
      else {
        this.menu.isOpen().then(data => {
          if (!data) {
            this.menu.enable(false);
          }
        });
        this.router.navigate(['/']);
      }
    });

    this.authenticationService.currentFirebaseUser$.subscribe(firebaseUser => {
      if (firebaseUser) {
        this.authenticationService.users$.pipe(
          tap(users => console.log(users)),
          tap(() => console.log(firebaseUser.uid)),
          map(users => users.find(users => users.key === firebaseUser.uid))
        ).subscribe((user: User) => {
          console.log("my subscribe: ", user);
          this.allowedMenuItems = menuItems.filter(menuItem => {
            return menuItem.roles.find(role => {
              return role === user.role;
            })
          });
        })
      }
    });
  }

  ngOnInit() {  }

  async logout() {
    const loading = await this.loadingController.create();
    await loading.present();

    const logout = this.authenticationService.signOut().then(
      async (res) => {
        loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Successfully logged out. See ya next time!',
          color: 'tertiary',
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
