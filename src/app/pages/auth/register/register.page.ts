import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController, AlertController, LoadingController } from "@ionic/angular";

import { AuthenticationService } from "../../../services/auth/authentication.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  registrationForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalController: ModalController,
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async signupUserWithEmailAndPassword() {
    const loading = await this.loadingController.create();
    await loading.present();
    this.authService
      .signupUserWithEmailAndPassword(        
        this.registrationForm.value
      )
      .then(
        (res) => {
          loading.dismiss();
          this.close();
        },
        async (err) => {
          loading.dismiss();
          const alert = await this.alertController.create({
            header: 'Sign up failed',
            message: err.message,
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
  }

  close() {
    this.modalController.dismiss();
  }
}
