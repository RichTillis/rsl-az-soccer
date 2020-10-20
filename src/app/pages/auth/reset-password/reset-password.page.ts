import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, ModalController, IonNav } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email = '';
  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController,
    private nav: IonNav
    ) { }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async sendResetEmail() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authenticationService.resetPassword(this.email).then(
      async res => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Request Submitted',
          message: 'An email is on the way with instructions to reset your password',
          buttons: [
            {
              text: 'OK',
              handler: () => {
                this.nav.pop();
              }
            }
          ]
        });
        await alert.present();
      },
      async err => {
        loading.dismiss();
        const alert = await this.alertController.create({
          header: ':(',
          message: err.message,
          buttons: ['OK']
        });

        await alert.present();
      }
    );
  }

  close() {
    this.modalController.dismiss();
  }

  async redirectToTarSite(e) {
    e.preventDefault();
    await Browser.open({ url: 'https://www.tucsonrealtors.org/' });
  }

}
