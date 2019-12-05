import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataContactService } from '../../../services/data-contact.service';
import { DataControlService } from '../../../services/data-control.service';
import { ContactInterface } from '../../../models/contact';
import { ControlInterface } from '../../../models/control';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modalmod',
  templateUrl: './modalmod.component.html',
  styleUrls: ['./modalmod.component.css']
})
export class ModalmodComponent implements OnInit {

  constructor(private dataCont: DataContactService, private dataContr: DataControlService) { }
  mydate = Date.now();
  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;
  @Input() userUid: string;
  @Input() Modificado: string = "Modificado";

  ngOnInit() {
  }

  onUpdateContact(contactForm: NgForm): void {
    if(contactForm.valid) {
    contactForm.value.userUid = this.userUid;
    contactForm.value.accion = this.Modificado;
      this.dataCont.updateContact(contactForm.value);
      this.dataContr.addControl(contactForm.value);
        contactForm.resetForm();
        this.btnClose.nativeElement.click();
    } else{
      console.log('Form NO valido');
    }
  }
}
