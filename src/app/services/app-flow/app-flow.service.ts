import { Injectable } from '@angular/core';
import { Deploy } from "cordova-plugin-ionic";

@Injectable({
  providedIn: 'root'
})
export class AppFlowService {

  constructor() { }
  async performManualUpdate() {

    const update = await Deploy.checkForUpdate()
    if (update.available){
      await Deploy.downloadUpdate((progress) => {
        console.log(progress);
      })
      await Deploy.extractUpdate((progress) => {
        console.log(progress);
      })
      alert("An update is available. The app will reload after the update is applied.")
      await Deploy.reloadApp();
    }
  }
}
