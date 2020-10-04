import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from "@ionic/angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController } from "@ionic/angular";
import { Plugins, PushNotification, PushNotificationToken } from '@capacitor/core';
const { PushNotifications } = Plugins;
import { AuthenticationService } from "../auth/authentication.service";


@Injectable({
  providedIn: 'root'
})
export class FcmService {

  devices:any = []

  constructor(
    private db: AngularFireDatabase,
    public firebaseNative: Firebase,
    private afAuth: AngularFireAuth,
    public authService: AuthenticationService,
    private platform: Platform,
    private toastController: ToastController

  ) {
    let path = `/users/${this.authService.currentUserId}/devices`;
    this.db.database.ref(path).on("value", snapshot => {
      this.devices = snapshot.val() || [];
    });
  }

  init(){
    console.log('ng init');

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('error on push notification registration ' + JSON.stringify(error))
    })
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('token ' + token.value)
      let path = `/users/${this.authService.currentUserId}/devices`
      this.devices.push(token.value)
      this.db
        .object(path)
        .set(this.devices)
        .catch(er => {
          alert(er)
          console.log("error:");
          console.log(er);
        });
    })
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
      console.log('notification ' + JSON.stringify(notification));
      this.presentNotifications(notification)
    })
    PushNotifications.register();
  }

  // async saveTokenToFirebase(token) {
  //   alert('saving to db')
  //   console.log("saving token to firebase: " + token)
  //   if (!token) return;
    
  // }

  async presentNotifications(notification) {
    console.log('notification: ' + JSON.stringify(notification));

    // Todo: ionic 5 upgrade - need to update
    const toast = await this.toastController.create({
      header: notification.title,
      message: notification.body,
      // showCloseButton: true,
      // closeButtonText: 'Got it',
      position: 'top'
    })
    toast.present()
  }
}
