import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, IonNav } from '@ionic/angular';
import { AuthenticationService } from '../../../services/auth/authentication.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email = '';

  constructor(
    private authenticationService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private nav: IonNav) { }

  ngOnInit() {
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

}
