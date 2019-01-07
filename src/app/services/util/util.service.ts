import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  constructor(private alertController: AlertController) {}

  async displayOkAlert(headerTitle, subHeaderTitle, messageBody) {
    const alert = await this.alertController.create({
      header: headerTitle,
      subHeader: subHeaderTitle,
      message: messageBody,
      buttons: ["OK"]
    });

    await alert.present();
  }
}
