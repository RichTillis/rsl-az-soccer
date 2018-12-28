import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  NavController,
  LoadingController,
  AlertController,
  ToastController
} from "@ionic/angular";

import { Validators, FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { UtilService } from "../../../services/util.service";

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
    private loadingCtrl: LoadingController,
    private utilService: UtilService,
    public toastController: ToastController
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
      this.presentToast();
      this.navCtrl.navigateForward("");
    } catch (err) {
      this.utilService.displayOkAlert("Whoops", "Something Bad Happened", err);
    }
  }

  loginWithGoogle(): void {}

  loginWithFacebook(): void {

    this.authService.doFacebookLogin().then(() => {
      console.log('here I am')
    })
  //  this.loadingCtrl
  //   .create({
  //      message: "Authenticating..."
  //  })
  //  .then(overlay => {
  //    this.loading = overlay;
  //    this.loading.present();
  //    this.authService.doFacebookLogin().then(() => {
  //      this.loading.dismiss();
  //      console.log('yo')
  //    });
  //  });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Login Successful - Welcome Back!',
      duration: 2000,
      color: 'tertiary',
      animated: true
    });
    toast.present();
  }
}
