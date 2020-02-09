import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Platform } from "@ionic/angular";

import { AuthenticationService } from "../../../services/auth/authentication.service";
import { LoadingService } from "../../../services/loading/loading.service";
import { ToastService } from "../../../services/toast/toast.service";
import { AlertService } from "../../../services/alert/alert.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  public pageTitle: string = "New Account";

  registrationForm: FormGroup;
  isAndroidDevice: boolean = false;

  validation_messages = {
    email: [
      { type: "required", message: "Email address is required." },
      { type: "email", message: "The format of the email address invalid." }
    ],
    password: [ { type: "required", message: "Password is required." } ],
    confirmPassword: [ { type: "email", message: "The format of the email address is invalid." } ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private alertService: AlertService,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [""],
      //TODO: validator - validate password and confirmPassword match
      confirmPassword: [""]
    });

    if(this.platform.is('android')){
      this.isAndroidDevice = true;    
    }
  }

  routeToLogin(): void {
    this.resetRegistrationForm();
    this.router.navigateByUrl("/login");
  }

  registerWithEmail() {
    let email: string = this.registrationForm.get("email").value;
    let password: string = this.registrationForm.get("password").value;

    this.registrationProcessing();

    this.authService
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.registrationSuccess();
        this.router.navigateByUrl("/home");
      })
      .catch(error => {
        this.registerFailed(error);
      });
  }

  loginWithFacebook(): void {
    // this.registrationProcessing();

    this.authService.doFacebookLogin();
    // .then(() => {
    //   this.resetRegistrationForm();
    //   this.registrationSuccess();
    //   this.router.navigateByUrl("/home");
    // })
    // .catch(error => {
    //   console.log("Error logging into Facebook", error);
    //   this.loadingService.dismiss();
    // });
  }

  registrationProcessing() {
    this.loadingService.present({
      message: "Registering. . ."
    });
  }

  registrationSuccess() {
    this.loadingService.dismiss();

    this.toastService.present({
      message: "All registered, welcome to RSL-AZ!",
      duration: 3000,
      color: "tertiary"
    });
  }

  registerFailed(error: any) {
    this.loadingService.dismiss();

    this.alertService.present({
      header: "Registration Error",
      subHeader: error.code,
      message: error.message,
      buttons: ["OK"]
    });
  }

  facebookLoginFailed() {
    this.loadingService.dismiss();

    this.alertService.present({
      header: "Facebook Login Error",
      message:
        "Sorry, we were unable to log you in using Facebook. Please use email/password to login.",
      buttons: ["OK"]
    });
  }

  resetRegistrationForm() {
    this.registrationForm.get("email").setValue("");
    this.registrationForm.get("password").setValue("");
    this.registrationForm.get("confirmPassword").setValue("");
    this.registrationForm.reset(this.registrationForm.value);
    this.registrationForm.markAsPristine();
  }
}
