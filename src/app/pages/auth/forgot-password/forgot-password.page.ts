import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

import { Validators, FormGroup, FormControl } from "@angular/forms";
import { AuthenticationService } from "../../../services/auth/authentication.service";
import { UtilService } from "../../../services/util/util.service";

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
    private authService: AuthenticationService,
    private utilService: UtilService
  ) {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", Validators.required)
    });
  }

  ngOnInit() {}

  resetPassword(): void {
    this.authService.resetPassword(this.forgotPasswordData.email).then(resp => {
      if (resp === "auth/user-not-found") {
        this.utilService.displayOkAlert(
          "Email Not Found",
          null,
          "That email address does not exist in the system"
        );
      } else {
        this.utilService.displayOkAlert(
          "Request Submitted",
          null,
          "An email is on the way with instructions to reset your password"
        );
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
}
