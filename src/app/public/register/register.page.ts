import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  registerData = {
    email: "",
    password: "",
    confirmPassword: ""
  };

  constructor(public navCtrl: NavController) {
    this.registerForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("test", Validators.required),
      confirm_password: new FormControl("test", Validators.required)
    });
  }

  ngOnInit() {}
  
  routeToLogin(): void {
    this.navCtrl.navigateBack("/login");
  }

  registerWithEmail() {
    if (this.registerData.password != this.registerData.confirmPassword) {
      this.displayAlert(
        "Password Problem!",
        "Passwords do not match, please try again."
      );
      this.registerData.password = "";
      this.registerData.confirmPassword = "";
    } else {
      // this.afAuth.auth.createUserWithEmailAndPassword(this.register.email, this.register.password)
      //   .then(res => this.registerSuccess(res))
      //   .catch(err => this.displayAlert('Error!', err));
    }
  }

  displayAlert(alertTitle, alertSub) {
    // let theAlert = this.alertCtrl.create({
    //   title: alertTitle,
    //   subTitle: alertSub,
    //   buttons: ['OK']
    // });
    // theAlert.present();
  }

  registerSuccess(result) {}
}
