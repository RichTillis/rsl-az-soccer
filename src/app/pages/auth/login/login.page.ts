import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Platform } from "@ionic/angular";

import { AuthenticationService } from "../../../services/auth/authentication.service";
import { ToastService } from "../../../services/toast/toast.service";
import { LoadingService } from "../../../services/loading/loading.service";
import { AlertService } from "../../../services/alert/alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isAndroidDevice: boolean = false;

  validation_messages = {
    email: [
      { type: "required", message: "Email address is required." },
      { type: "email", message: "The format of the email address invalid." }
    ],
    password: [{ type: "required", message: "Password is required." }]
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
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: ["", Validators.required]
    });

    // console.log(this.platform.platforms());

    if(this.platform.is('android')){
      this.isAndroidDevice = true;    
    }
  }

  routeToSignUp(): void {
    this.resetLoginForm();
    this.router.navigateByUrl("/register");
  }

  routeToForgotPassword(): void {
    this.resetLoginForm();
    this.router.navigateByUrl("/forgotPassword");
  }

  async loginWithEmail() {
    let email: string = this.loginForm.get("email").value;
    let password: string = this.loginForm.get("password").value;

    // this.loginPocessing();

    this.authService
      .doEmailLogin(email, password)
      .then(() => {
        this.resetLoginForm();
        // this.loginSuccess();
        //put menu enable here
        // this.router.navigateByUrl("/home");
      })
      .catch(error => {
        this.loginFailed(error);
      });
  }

  loginWithFacebook(): void {
    // this.loginPocessing();

    this.authService.doFacebookLogin();
    // .then(response => {
    //   console.log("login successful?");
    //   console.log("loggin in response: ", response);
    //   this.resetLoginForm();
    //   this.loginSuccess();
    //   this.router.navigateByUrl("/home");
    // });
  }

  /* 
  Maybe everything below goes into a login service?
  */
  resetLoginForm() {
    this.loginForm.get("email").setValue("");
    this.loginForm.get("password").setValue("");
    this.loginForm.reset(this.loginForm.value);
    this.loginForm.markAsPristine();
  }

  loginPocessing() {
    this.loadingService.present({
      message: "Logging in . . ."
    });
  }

  loginSuccess() {
    this.loadingService.dismiss();
    //put menu enable here
    this.toastService.present({
      message: "Welcome back!",
      duration: 3000,
      color: "tertiary"
    });
  }

  loginFailed(error: any) {
    this.loadingService.dismiss();
    this.alertService.present({
      header: "Login Error",
      subHeader: error.code,
      message: error.message,
      buttons: ["OK"]
    });
  }
}
