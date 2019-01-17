import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Platform } from "@ionic/angular";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { ToastController } from "@ionic/angular";
import { Plugins, PushNotification, PushNotificationToken } from '@capacitor/core';
const { PushNotifications } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private db: AngularFireDatabase,
    public firebaseNative: Firebase,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private toastController: ToastController

  ) { }

  init(){
    console.log('ng init');

    PushNotifications.addListener('registrationError', (error: any) => {
      console.log('error on push notification registration ' + JSON.stringify(error))
    })
    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      console.log('token ' + token.value)
      PushNotifications.addListener('pushNotificationReceived', (notification: PushNotification) => {
        console.log('notification ' + JSON.stringify(notification));
        this.presentNotifications(notification)
        this.saveTokenToFirebase(token.value)
      })
    })
    PushNotifications.register();
  }

  async saveTokenToFirebase(token) {
    console.log("saving token to firebase: " + token)
    if (!token) return;
    let path = `devices/${token}`
    this.db.object(path).update({
      token,
      userId: this.afAuth.auth.currentUser.uid
    });
  }

  async presentNotifications(notification) {
    console.log('notification: ' + JSON.stringify(notification));

    const toast = await this.toastController.create({
      message: notification.body,
      showCloseButton: true,
      closeButtonText: 'Got it',
      position: 'middle'
    })
    toast.present()
  }
}
