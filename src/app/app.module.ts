import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from 'src/environments/environment';
import { AuthService } from './seservices/auth.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
firebase.initializeApp(environment.firebaseConfig);


@ NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule, AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, OneSignal
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
