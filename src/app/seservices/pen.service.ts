import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { pendiente } from '../models/pendientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PenService {
  private pendientesCollection: AngularFirestoreCollection<pendiente>;
  private pendientes: Observable<pendiente[]>;
  constructor(db: AngularFirestore) { 
    this.pendientesCollection = db.collection<pendiente>('pendientes');
    this.pendientes = this.pendientesCollection.snapshotChanges().pipe(map(
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
    return this.pendientes;
  }
  getTodo(id:string){
    this.pendientesCollection.doc<pendiente>(id).valueChanges();
  }
  updateU(pendi:pendiente,id:string){
   return this.pendientesCollection.doc(id).update(pendi);
  }
  addUser(user:pendiente){
     return this.pendientesCollection.add(user);
  }
  deleteU(id:string){
     return this.pendientesCollection.doc(id).delete();
  }

}
