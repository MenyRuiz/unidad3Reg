import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { producto } from '../models/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProService {
  private productosCollection: AngularFirestoreCollection<producto>;
  private productos: Observable<producto[]>;
  constructor(db: AngularFirestore) { 
    this.productosCollection = db.collection<producto>('productos');
    this.productos = this.productosCollection.snapshotChanges().pipe(map(
      actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        });
      }
    ));
  }

  getTodos(){
    return this.productos;
  }
  getTodo(id:string){
    this.productosCollection.doc<producto>(id).valueChanges();
  }
  updateU(pendi:producto,id:string){
   return this.productosCollection.doc(id).update(pendi);
  }
  addUser(user:producto){
     return this.productosCollection.add(user);
  }
  deleteU(id:string){
     return this.productosCollection.doc(id).delete();
  }


}
