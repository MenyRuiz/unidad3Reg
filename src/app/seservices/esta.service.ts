import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { estadia } from '../models/estadias.interface';

@Injectable({
  providedIn: 'root'
})
export class EstaService {
  private estanciasCollection: AngularFirestoreCollection<estadia>;
  private estancias: Observable<estadia[]>;
  constructor(db: AngularFirestore) { 
    this.estanciasCollection = db.collection<estadia>('estancias');
    this.estancias = this.estanciasCollection.snapshotChanges().pipe(map(
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
    return this.estancias;
  }
  getTodo(id:string){
    this.estanciasCollection.doc<estadia>(id).valueChanges();
  }
  updateU(user:estadia,id:string){
   return this.estanciasCollection.doc(id).update(user);
  }
  addUser(user:estadia){
     return this.estanciasCollection.add(user);
  }
  deleteU(id:string){
     return this.estanciasCollection.doc(id).delete();
  }
}
