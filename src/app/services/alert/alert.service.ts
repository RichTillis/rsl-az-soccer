import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController:AlertController) { }

  async present(options: object) {
    // Dismiss all pending alerts before creating the new one
    await this.dismiss();

    await this.alertController
      .create(options)
      .then(res => {
        res.present();
      });
  }

    /**
   * Dismiss all the pending alerts, if any
   */
  async dismiss() {
    while (await this.alertController.getTop() !== undefined) {
      await this.alertController.dismiss();
    }
  }
}
