import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  routeToLogin(): void {
    this.navCtrl.navigateBack("/login");
  }
  register = {
    email: '',
    password: '',
    password2: ''
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  displayAlert(alertTitle, alertSub) {
    // let theAlert = this.alertCtrl.create({
    //   title: alertTitle,
    //   subTitle: alertSub,
    //   buttons: ['OK']
    // });
    // theAlert.present();
  }

  registerUser() {
    if (this.register.password != this.register.password2) {
      this.displayAlert('Password Problem!', 'Passwords do not match, please try again.');
      this.register.password = '';
      this.register.password2 = '';
    }
    else {
      // this.afAuth.auth.createUserWithEmailAndPassword(this.register.email, this.register.password)
      //   .then(res => this.registerSuccess(res))
      //   .catch(err => this.displayAlert('Error!', err));
    }
  }
  
  registerSuccess(result) {
  }



}
