import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

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

  loginData = {
    email: "",
    password: ""
  };
  constructor(
    public navCtrl: NavController,
    private authService: AuthenticationService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required)
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

  loginWithFacebook(): void {}

  loginWithGoogle(): void {}
}
