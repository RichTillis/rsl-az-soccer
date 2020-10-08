import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
import { AuthenticationService } from "../../../services/auth/authentication.service";
import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  resetPasswordPage = ResetPasswordPage;
  iosDevice: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // obv this needs work
    const foo = this.isIosDevice();
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

  async isIosDevice() {
    const device = await Device.getInfo();

    if (device.platform === 'ios') {
      this.iosDevice = true;
    }
  }

}
