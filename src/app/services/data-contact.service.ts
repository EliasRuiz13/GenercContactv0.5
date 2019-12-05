import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ContactInterface } from '../models/contact';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataContactService {

  constructor(private afs: AngularFirestore) { }
  private contactsCollection: AngularFirestoreCollection<ContactInterface>;
  private contacts: Observable<ContactInterface[]>;
  private contactDoc: AngularFirestoreDocument<ContactInterface>;
  private contact: Observable<ContactInterface>;
  public selectedContact: ContactInterface = {
    id: null
  };

  getAllContacts() {
    this.contactsCollection = this.afs.collection<ContactInterface>('contacts');
    return this.contacts = this.contactsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as ContactInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getOneContact(idContact: string) {
    this.contactDoc = this.afs.doc<ContactInterface>(`contacts/${idContact}`);
    return this.contact = this.contactDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as ContactInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  addContact(contact: ContactInterface): void {
    this.contactsCollection.add(contact);
  }
  updateContact(contact: ContactInterface): void {
    let idcontact = contact.id;
    this.contactDoc = this.afs.doc<ContactInterface>(`contacts/${idcontact}`);
    this.contactDoc.update(contact);
  }
  deleteContact(idcontact: string): void {
    this.contactDoc = this.afs.doc<ContactInterface>(`contacts/${idcontact}`);
    this.contactDoc.delete();
  }
}
