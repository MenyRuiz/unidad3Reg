import { Component, OnInit } from '@angular/core';
import { usuario } from '../models/usuarios.interface';
import { ReqService } from '../seservices/req.service';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';




@ Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  usuarios: usuario[];
  user: usuario = {
    nombre: '',
    apellido: '',
    Sueldo: '',
    celular: '',
    estado: ''
  };
  dataToSend: usuario = {
    nombre: '',
    apellido: '',
    Sueldo: '',
    celular: '',
    estado: ''
  };
  constructor(private uservice: ReqService, private alertCtrl: AlertController,
    // tslint:disable-next-line:align
    public nav: NavController) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.uservice.getTodos().subscribe(res => {
      console.log('s', res);
      this.usuarios = res;
    });
  }
  reload() {
    window.location.reload();
  }
  add() {
    this.uservice.addUser(this.user).then(() => {
      this.reload();
    });
  }
  remove(id: string) {
    this.uservice.deleteU(id);
    console.log(id);
    // this. reload();
  }
  async edit(editValor: string, name: string, ap: string, sue: string, cel: string, est: string) {
    console.log(editValor);
    const alertInput = await this.alertCtrl.create({
      header: 'Editar pedido',
      message: 'Modificar',
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Color',
        value: name
      },
      {
        name: 'apellido',
        type: 'text',
        placeholder: 'Cantidad',
        value: ap
      },
      {
        name: 'Sueldo',
        type: 'text',
        placeholder: 'Talla',
        value: sue
      },
      {
        name: 'celular',
        type: 'text',
        placeholder: 'Marca',
        value: cel
      },
      {
        name: 'estado',
        type: 'text',
        placeholder: 'Hombre o Mujer',
        value: est
      }
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
              nombre: datos.nombre,
              apellido: datos.apellido,
              Sueldo: datos.Sueldo,
              celular: datos.celular,
              estado: datos.estado
            };
            console.log (this.dataToSend);
            this.uservice.updateU(this.dataToSend, editValor).then(() => {
            this.reload();
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


