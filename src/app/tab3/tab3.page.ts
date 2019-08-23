import { Component } from '@angular/core';
import { producto } from '../models/productos.interface';
import { ProService } from '../seservices/pro.service';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../seservices/auth.service';
import { NavController } from '@ionic/angular';

@ Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  productote: producto[];
  productos: producto = {
    cantidad: '',
    nombre: '',
    precio: '',
    tipo: ''
  };
  dataToSends: producto = {
    cantidad: '',
    nombre: '',
    precio: '',
    tipo: ''
  };
  constructor(public proserv: ProService,
              private alertCtrl: AlertController,
              private queti: AuthService,
              public nav: NavController
    ) {}
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.proserv.getTodos().subscribe(res => {
      console.log('s', res);
      this.productote  = res;
    });
  }
  add() {
   this.proserv.addUser(this.productos).then(() => {
  });
  }
  async edit(editValor: string, name: string, cant: string, precio: string, type: string) {
    const alertInput = await this.alertCtrl.create({
      header: 'Editar Pedido',
      message: 'Modificar',
      inputs: [{
        name: 'nombre',
        type: 'text',
        placeholder: 'Color',
        value: name
      },
      {
        name: 'cantidad',
        type: 'number',
        placeholder: 'Cantidad',
        value: cant
      },
      {
        name: 'precio',
        type: 'number',
        placeholder: 'Talla',
        value: precio
      },
    {
      name: 'tipo',
      type: 'text',
      placeholder: 'Hombre / Mujer / Unisex',
      value: type
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
            this.dataToSends = {
              nombre: datos.nombre,
              cantidad: datos.cantidad,
              precio: datos.precio,
              tipo: datos.tipo
            };
            console.log (this.dataToSends);
            this.proserv.updateU(this.dataToSends, editValor).then(() => {
          });
        }
      }
      ]
    });
    await alertInput.present();
  }
  remove(id: string) {
    this.proserv.deleteU(id);
  }
  logOut() {
    this.queti.logoutUser();
    this.nav.navigateForward('/');
  }
}
