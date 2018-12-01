import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouteReuseStrategy, Routes } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { IonicStorageModule } from "@ionic/storage";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AuthGuardService } from "./services/auth-guard.service";

import { Facebook } from "@ionic-native/facebook/ngx";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";

// firebase auth config
import { firebaseConfig } from "../../firebase.auth";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthGuardService,
    Facebook
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
