import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from "../../../services/auth/authentication.service";
import { UtilService } from "../../../services/util/util.service";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.page.html",
  styleUrls: ["./forgot-password.page.scss"]
})
export class ForgotPasswordPage implements OnInit {
  public pageTitle: string = "Forgot Password";

  forgotPasswordForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email address is required." },
      { type: "email", message: "The format of the email address invalid." }
    ]
  };

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private utilService: UtilService,
    public formBuilder: FormBuilder
  ) {  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });
  }

  resetPassword(): void {
    let email: string = this.forgotPasswordForm.get("email").value;

    this.authService.resetPassword(email).then(resp => {
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
        this.routeToLogin();
      }
    });
  }

  routeToSignUp(): void {
    this.resetForgotPasswordForm();
    this.router.navigateByUrl("/register");
  }

  routeToLogin(): void {
    this.resetForgotPasswordForm();
    this.router.navigateByUrl("/login");
  }

  resetForgotPasswordForm() {
    this.forgotPasswordForm.get("email").setValue("");
    this.forgotPasswordForm.reset(this.forgotPasswordForm.value);
    this.forgotPasswordForm.markAsPristine();
  }
}
