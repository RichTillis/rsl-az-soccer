import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(public loadingController: LoadingController) { }

  //https://stackoverflow.com/questions/52574448/ionic-4-loading-controller-dismiss-is-called-before-present-which-will-ke

  async present(options: object) {
    // Dismiss all pending loaders before creating the new one
    await this.dismiss();

    await this.loadingController
      .create(options)
      .then(res => {
        res.present();
      });
  }

  /**
   * Dismiss all the pending loaders, if any
   */
  async dismiss() {
    while (await this.loadingController.getTop() !== undefined) {
      await this.loadingController.dismiss();
    }
  }

}
