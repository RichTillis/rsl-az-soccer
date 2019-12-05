import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
  registrationForm: FormGroup;

  validation_messages = {
    email: [
      { type: "required", message: "Email address is required." },
      { type: "email", message: "The format of the email address invalid." }
    ],
    password: [
      { type: "required", message: "Password is required." },
      {
        type: "minlength",
        message: "Password must be at least 8 characters long."
      }
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(8)])
      ],
      //TODO: validator - validate password and confirmPassord match
      confirmPassword: [""]
    });
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
    this.registrationProcessing();

    this.authService.doFacebookLogin().then(() => {
      this.resetRegistrationForm();
      this.registrationSuccess();
      this.router.navigateByUrl("/home");
    });
  }

  registrationProcessing() {
    this.loadingService.present({
      message: "Registering. . ."
    });
  }

  registrationSuccess() {
    this.loadingService.dismiss();

    this.toastService.present({
      message: "All registered, welcome aboard!",
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

  resetRegistrationForm() {
    this.registrationForm.get("email").setValue("");
    this.registrationForm.get("password").setValue("");
    this.registrationForm.get("confirmPassword").setValue("");
    this.registrationForm.reset(this.registrationForm.value);
    this.registrationForm.markAsPristine();
  }
}