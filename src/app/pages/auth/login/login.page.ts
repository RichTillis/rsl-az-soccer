import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import { AuthenticationService } from "../../../services/auth/authentication.service";
import { Plugins } from '@capacitor/core';

const { Browser, Device } = Plugins;

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit, OnDestroy {
  loginForm: FormGroup;
  resetPasswordPage = ResetPasswordPage;
  iosDevice: boolean = false;

  // This does not feel like a good solution. Once Google auth is successful this page looses 
  // scope or something and cannot be closed. This subscription knows when login has completed 
  // and forces closed this modal
  private authState = this.authService.authenticationState.subscribe((data) => {
    const loggedIn = data;
    if (loggedIn) {
      this.close();
    }
  });

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    Device.getInfo().then((device) => {
      if (device.platform === 'ios') {
        this.iosDevice = true;
      }
    });
  }

  ngOnDestroy() {
    this.authState.unsubscribe();
  }

  async signInWithEmailAndPassword() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService
      .signInWithEmailAndPassword(this.loginForm.value)
      .then(
        (res) => {
          loading.dismiss();
          this.close();
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: ':(',
            message: err.message,
            buttons: ['OK'],
          });

          await alert.present();
        }
      )
  }

  loginWithFacebook(): void {
    // this.loginPocessing();

    this.authService.doFacebookLogin();
    // .then(response => {
    //   console.log("login successful?");
    //   console.log("loggin in response: ", response);
    //   this.resetLoginForm();
    //   this.loginSuccess();
    // });
  }

  close() {
    this.modalController.dismiss();
  }

  openGoogleSignup() {
    this.authService.googleSignup().then((res) => {
    }, err => {
      //Cancelled the sign up
    });
  }

  openFacebookSignup() {

  }

  async redirectToTarSite(e) {
    e.preventDefault();
    await Browser.open({ url: 'https://www.tucsonrealtors.org/' });
  }

}