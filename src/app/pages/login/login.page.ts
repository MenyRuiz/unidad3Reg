import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../seservices/auth.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email;
  password;
  constructor(
    public authService: AuthService,
    public nav: NavController
  ) { }

  ngOnInit() {
  }
  enviar(){
    const value = {
      email: this.email,
      password: this.password
    }
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.nav.navigateForward('/tabs/tabs/tab1');
      
    }, err => {
      console.log('Algo salió mal');
    })

  }
}
