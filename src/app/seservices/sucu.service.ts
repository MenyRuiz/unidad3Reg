import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { sucursal } from '../models/sucursales.interface';

@Injectable({
  providedIn: 'root'
})
export class SucuService {
  private sucursalesCollection: AngularFirestoreCollection<sucursal>;
  private sucursales: Observable<sucursal[]>;
  constructor(db: AngularFirestore) { 
    this.sucursalesCollection = db.collection<sucursal>('sucursales');
    this.sucursales = this.sucursalesCollection.snapshotChanges().pipe(map(
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
    return this.sucursales;
  }
  getTodo(id:string){
    this.sucursalesCollection.doc<sucursal>(id).valueChanges();
  }
  updateU(user:sucursal,id:string){
   return this.sucursalesCollection.doc(id).update(user);
  }
  addUser(user:sucursal){
     return this.sucursalesCollection.add(user);
  }
  deleteU(id:string){
     return this.sucursalesCollection.doc(id).delete();
  }
}
