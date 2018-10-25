import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { NavController, AlertController } from "@ionic/angular";

import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  registerData = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  constructor(
    public navCtrl: NavController,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) {
    this.registerForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("test", Validators.required),
      confirm_password: new FormControl("test", Validators.required)
    });
  }

  ngOnInit() {}

  routeToLogin(): void {
    this.navCtrl.navigateBack("/login");
  }

  registerWithEmail() {
    if (this.registerData.password != this.registerData.confirmPassword) {
      this.displayAlert(
        "Whoops",
        "Password Problem",
        "Passwords don't match, please try again."
      );
      this.registerData.password = "";
      this.registerData.confirmPassword = "";
    } else {
      this.authService
        .createUserWithEmailAndPassword(
          this.registerData.email,
          this.registerData.password
        )
        .then(res => this.registerSuccess(res))
        .catch(err =>
          this.displayAlert("Whoops", "Something Bad Happened", err)
        );
    }
  }

  async displayAlert(headerTitle, subHeaderTitle, messageBody) {
    const alert = await this.alertController.create({
      header: headerTitle,
      subHeader: subHeaderTitle,
      message: messageBody,
      buttons: ["OK"]
    });

    await alert.present();
  }

  registerSuccess(result) {
    console.log(result);
    this.displayAlert("Welcome!", null, "Registration Successful");
  }
}
