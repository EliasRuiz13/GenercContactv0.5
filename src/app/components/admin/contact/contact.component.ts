import { Component, OnInit } from '@angular/core';
import { DataContactService } from '../../../services/data-contact.service';
import { DataControlService } from 'src/app/services/data-control.service';
import { ContactInterface } from '../../../models/contact';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  constructor(private dataCont: DataContactService, private dataContr: DataControlService, private authService: AuthService) { }
  filterPost = '';
  pageActual: number = 1;
  private contacts: ContactInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListContacts();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          // this.isAdmin = true;
        })
      }
    })
  }
  getListContacts() {
    this.dataCont.getAllContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
      });
  }

  onDeleteContact(idContact: string): void {
    const confirmacion = confirm('Estas seguro?');
    if (confirmacion) {
      this.dataCont.deleteContact(idContact);
    }
  }
  //onSaveControl(contactForm: NgForm): void{
  //  contactForm.value.userUid = this.userUid;
  //  this.dataContr.deleteControl(contactForm.value);
  //}

  onPreUpdateContact(contact: ContactInterface) {
    this.dataCont.selectedContact = Object.assign({}, contact);
  }

}
