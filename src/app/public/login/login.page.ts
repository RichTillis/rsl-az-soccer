import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  NavController,
  LoadingController,
  AlertController
} from "@ionic/angular";

import { Validators, FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  error: string;
  private loading;

  loginData = {
    email: "",
    password: ""
  };
  constructor(
    public navCtrl: NavController,
    private authService: AuthenticationService,
    private loadingCtrl: LoadingController
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.required])),
      password: new FormControl("", Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {}

  routeToSignUp(): void {
    this.navCtrl.navigateForward("/register");
  }

  routeToForgotPassword(): void {
    this.navCtrl.navigateForward("/forgotPassword");
  }

  async loginWithEmail() {
    try {
      await this.authService.doEmailLogin(
        this.loginData.email,
        this.loginData.password
      );
      this.loginData.email = "";
      this.loginData.password = "";
    } catch (err) {
      this.error = err.message;
    }
  }

  loginWithGoogle(): void {}

  loginWithFacebook(): void {
    this.loadingCtrl
      .create({
        message: "Authenticating..."
      })
      .then(overlay => {
        this.loading = overlay;
        this.loading.present();
        this.authService.doFacebookLogin().then(() => {
          this.loading.dismiss();
        });
      });
  }
}
