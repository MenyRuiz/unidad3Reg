import { Component, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NavController } from '@ionic/angular';


@ Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
  lat: number;
  lon: number;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) { }

  ngOnInit() {
    this.geolocationNative();
  }
  geolocationNative() {
    this. geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
      console.log(geoposition);
      this.lat = geoposition.coords.latitude;
      this.lon = geoposition.coords.longitude;
    });
  }

  loadcord(position: Geoposition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude, longitude);
  }

}
