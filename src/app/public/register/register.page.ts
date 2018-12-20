import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { NavController } from "@ionic/angular";

import { AuthenticationService } from "../../services/authentication.service";
import { UtilService } from "../../services/util.service";

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

  constructor(
    public navCtrl: NavController,
    private authService: AuthenticationService,
    private utilService: UtilService
  ) {
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
      this.utilService.displayOkAlert("Whoops","Password Problem","Passwords don't match, please try again");
      this.registerData.password = "";
      this.registerData.confirmPassword = "";
    } else {
      this.authService
        .createUserWithEmailAndPassword(
          this.registerData.email,
          this.registerData.password
        )
        .then(res => this.registerSuccess(res))
        .catch(err =>
          this.utilService.displayOkAlert("Whoops","Something Bad Happened",err)
        );
    }
  }

  registerSuccess(result) {
    console.log(result);
    this.utilService.displayOkAlert("Welcome", null, "Registration Successful");
  }

  loginWithFacebook(): void {

    this.authService.doFacebookLogin().then(() => {
      console.log('here I am')
    })
  //  this.loadingCtrl
  //   .create({
  //      message: "Authenticating..."
  //  })
  //  .then(overlay => {
  //    this.loading = overlay;
  //    this.loading.present();
  //    this.authService.doFacebookLogin().then(() => {
  //      this.loading.dismiss();
  //      console.log('yo')
  //    });
  //  });
  }
}
