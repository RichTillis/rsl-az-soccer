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
    this.authService.resetPassword(this.forgotPasswordData.email);
    this.displayAlert();
    this.navCtrl.navigateBack("/login");
  }

  routeToSignUp(): void {
    this.navCtrl.navigateForward("/register");
  }

  routeToLogin(): void {
    this.navCtrl.navigateBack("/login");
  }

  async displayAlert() {
    const alert = await this.alertController.create({
      header: "Password Reset",
      subHeader: "Request Submitted",
      message:
        "If the email address you submitted exists in our system, you'll receive an email with instructions on how to reset your password",
      buttons: ["OK"]
    });

    await alert.present();
  }
}
