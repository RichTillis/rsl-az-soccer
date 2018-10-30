import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";

import { Validators, FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "../../services/authentication.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"]
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;

  forgotPasswordData = {
    email: ""
  };
  constructor(
    public navCtrl: NavController,
    private alertController: AlertController,
    private authService: AuthenticationService
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  resetPassword(): void {
    this.authService.resetPassword(this.forgotPasswordData.email).then(resp => {
      if (resp === "auth/user-not-found") {
        this.displayUserNotFound();
      } else {
        this.displayAlert();
        this.navCtrl.navigateBack("/login");
      }
    });
  }

  routeToSignUp(): void {
    this.navCtrl.navigateForward("/register");
  }

  routeToLogin(): void {
    this.navCtrl.navigateBack("/login");
  }

  async displayAlert() {
    const alert = await this.alertController.create({
      header: "Request Submitted",
      message:
        "An email is on the way with instructions to reset your password",
      buttons: ["OK"]
    });

    await alert.present();
  }

  async displayUserNotFound() {
    const alert = await this.alertController.create({
      header: "Email Not Found",
      message: "That email address does not exist in the system",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
