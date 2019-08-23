import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

@ Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if (this.platform.is('cordova')) {
        this. setupPush();
      }
    });
  }
  setupPush() {
    this. oneSignal.startInit('8cf94a83-2415-4873-ae77-b32c1a115394', '72694479498');
    this. oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    this. oneSignal.handleNotificationReceived().subscribe(data => {
      const msg = data.payload.body;
      const title = data.payload.title;
      const additionalData = data.payload.additionalData;
      this. showAlert(title, msg, additionalData.task);
    });
    this. oneSignal.handleNotificationOpened().subscribe(data => {
      const additionalData = data.notification.payload.additionalData;

      this. showAlert('Notificacion abierta', 'Estas listo para leerla', additionalData.task);
    });
    this. oneSignal.endInit();
  }
  async showAlert(title, msg, task) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: msg,
      buttons: [
        {
          text: 'Action: ${task}',
          handler: () => {
            //
          }
        }
      ]
    });
    alert.present();
  }
}
