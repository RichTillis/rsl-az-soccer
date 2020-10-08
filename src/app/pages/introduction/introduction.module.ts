import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntroductionPageRoutingModule } from './introduction-routing.module';

import { IntroductionPage } from './introduction.page';
import { LoginPageModule } from '../auth/login/login.module';
import { ComponentsModule } from '../../components/components.module';
import { RegisterPageModule } from '../auth/register/register.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroductionPageRoutingModule,
    LoginPageModule,
    ComponentsModule,
    RegisterPageModule
  ],
  declarations: [IntroductionPage]
})
export class IntroductionPageModule { }
