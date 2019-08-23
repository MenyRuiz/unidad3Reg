import { Component, OnInit } from '@angular/core';
import { estadia } from '../models/estadias.interface';
import { EstaService } from '../seservices/esta.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@ Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  estadias: estadia[];
  esta: estadia = {
    participantes: '',
    porcentaje: '',
    proyecto: ''
  };
  dataToSend: estadia = {
    participantes: '',
    porcentaje: '',
    proyecto: ''
  };
  constructor(private estaServ: EstaService, private alertCtrl: AlertController, public nav: NavController) { }

  ngOnInit() {
    this.estaServ.getTodos().subscribe(res => {
      console.log('s', res);
      this.estadias = res;
    });
  }
  add() {
    this.estaServ.addUser(this.esta).then(() => {

  });
  }
  remove(id: string) {
    this.estaServ.deleteU(id);
  }
  async edit(editValor: string, proy: string, porce: string, parti: string) {
    console.log(editValor);
    const alertInput = await this.alertCtrl.create({
      header: 'Editar pedido',
      message: 'Modificar',
      inputs: [{
        name: 'proyecto',
        type: 'text',
        placeholder: 'Tipo',
        value: proy
      },
      {
        name: 'porcentaje',
        type: 'text',
        placeholder: 'Talla',
        value: porce
      },
      {
        name: 'participantes',
        type: 'text',
        placeholder: 'Color',
        value: parti
      },
      ],
      buttons: [
        {
          text: 'Cancelar edicion',
          role: 'Cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Se cancelo la acción');
          }
        }, {
          text: 'Guardar',
          handler: (datos) => {
            this.dataToSend = {
              proyecto: datos.proyecto,
              porcentaje: datos.porcentaje,
              participantes: datos.participantes
            };
            console.log (this.dataToSend);
            this. estaServ.updateU(this.dataToSend, editValor).then(() => {
          });
        }
      }
      ]
    });
    await alertInput.present();
    }
    logOut() {
      this.nav.navigateForward('/');
    }
}
