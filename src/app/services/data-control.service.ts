import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ControlInterface } from '../models/control';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataControlService {

  constructor(private afs: AngularFirestore) { }
  private controlsCollection: AngularFirestoreCollection<ControlInterface>;
  private controls: Observable<ControlInterface[]>;
  private controlDoc: AngularFirestoreDocument<ControlInterface>;
  private control: Observable<ControlInterface>;
  public selectedControl: ControlInterface = {
    id: null
  };

  getAllControls() {
    this.controlsCollection = this.afs.collection<ControlInterface>('controls');
    return this.controls = this.controlsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ControlInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }
  
  getOneControl(idControl: string) {
    this.controlDoc = this.afs.doc<ControlInterface>(`controls/${idControl}`);
    return this.control = this.controlDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ControlInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }
  
  addControl(control: ControlInterface): void {
    this.controlsCollection.add(control);
  }

}
