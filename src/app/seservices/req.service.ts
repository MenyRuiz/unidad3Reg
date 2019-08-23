import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { usuario } from '../models/usuarios.interface';


@Injectable({
  providedIn: 'root'
})
export class ReqService {
  private usuariosCollection: AngularFirestoreCollection<usuario>;
  private usuarios: Observable<usuario[]>;
  constructor(db: AngularFirestore) {
    this.usuariosCollection = db.collection<usuario>('usuarios');
    this.usuarios = this.usuariosCollection.snapshotChanges().pipe(map(
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
     return this.usuarios;
   }
   getTodo(id:string){
     this.usuariosCollection.doc<usuario>(id).valueChanges();
   }
   updateU(user:usuario,id:string){
    return this.usuariosCollection.doc(id).update(user);
   }
   addUser(user:usuario){
      return this.usuariosCollection.add(user);
   }
   deleteU(id:string){
      return this.usuariosCollection.doc(id).delete();
   }
}
