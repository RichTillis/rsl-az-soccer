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
      password: new FormControl("test", Validators.required)
    });
  }

  ngOnInit() {}

  routeToSignUp(): void {
    this.navCtrl.navigateForward("/register");
  }

  loginWithEmail() {
    this.authService.login();
  }
  
  loginWithFacebook(): void {}

  loginWithGoogle(): void {}
}
