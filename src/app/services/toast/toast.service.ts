import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(public toastController: ToastController) { }

  async present(options: object) {
    // Dismiss all pending loaders before creating the new one
    await this.dismiss();

    await this.toastController
      .create(options)
      .then(res => {
        res.present();
      });
  }

    /**
   * Dismiss all the pending loaders, if any
   */
  async dismiss() {
    while (await this.toastController.getTop() !== undefined) {
      await this.toastController.dismiss();
    }
  }
}
