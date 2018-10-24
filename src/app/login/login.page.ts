import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  signup: FormGroup;

  registerPage: any;

  loginData = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController) {
    this.signup = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("test", Validators.required),
      confirm_password: new FormControl("test", Validators.required)
    });
  }

  routeToSignUp(): void {
    this.navCtrl.navigateForward("/register");
  }

  ngOnInit() {}

  loginWithEmail(): void {
    console.log(this.loginData);
  }
}
