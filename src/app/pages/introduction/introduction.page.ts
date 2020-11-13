import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet, ActionSheetController } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { AuthenticationService } from '../../services/auth/authentication.service'
import { RegisterPage } from '../auth/register/register.page';
import { LoginPage } from '../auth/login/login.page';
import { ModalBaseComponent } from '../../components/modal-base/modal-base.component';
const { Browser, Device } = Plugins;

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.page.html',
  styleUrls: ['./introduction.page.scss'],
})
export class IntroductionPage implements OnInit {
  public pageTitle: string = "2021 Shootout!";

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private actionSheetController: ActionSheetController,
    private authService: AuthenticationService
  ) { }

  ngOnInit() { }

  async openTerms(e) {
    e.preventDefault();
    await Browser.open({ url: 'https://rslazsoccer.com/' });
  }

  async openPrivacy(e) {
    e.preventDefault();
    await Browser.open({ url: 'https://rslazsoccer.com/privacy-policy/' });
  }

  async openEmailSignup() {
    const modal = await this.modalController.create({
      component: RegisterPage,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
    });
    await modal.present();
  }

  async openSignup() {
    const buttons = [
      {
        text: 'Sign up with Email',
        icon: 'mail',
        handler: () => {
          this.openEmailSignup();
        },
      },      
      {
        text: 'Sign up with Google',
        icon: 'logo-google',
        handler: () => {
          this.openGoogleSignup();
        }
      },
      {
        text: 'Sign up with Facebook',
        icon: 'logo-facebook',
        handler: () => {
          this.openFacebookSignup();
        }
      }
    ];

    const device = await Device.getInfo();

    if (device.platform === 'ios') {
      buttons.push({
        text: 'Sign in with Apple',
        icon: 'logo-apple',
        handler: () => {
          this.openAppleSignup();
        }
      })
    }

    const actionSheet = await this.actionSheetController.create({
      cssClass: 'custom-action-sheet',
      buttons
    });
    await actionSheet.present();
  }

  openGoogleSignup() {
    this.authService.googleSignup().then((res) => {
    }, err => {
      //Cancelled the sign up
    });
  }

  openAppleSignup() {
    //TODO
  }

  openFacebookSignup() {
    this.authService.facebookLogin();
  }

  async openLogin() {
    const modal = await this.modalController.create({
      component: ModalBaseComponent,
      presentingElement: this.routerOutlet.nativeEl,
      swipeToClose: true,
      componentProps: {
        rootPage: LoginPage,
      },
    });
    await modal.present();
  }

}