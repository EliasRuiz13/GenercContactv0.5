import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataContactService } from '../../services/data-contact.service';
import { DataControlService } from '../../services/data-control.service';
import { ContactInterface } from '../../models/contact';
import { ControlInterface } from '../../models/control';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {

  constructor(private dataCont: DataContactService, private dataContr: DataControlService) {  }
  mydate = Date.now();
  @ViewChild('btnClose', { static: true }) btnClose: ElementRef;
  @Input() userUid: string;
  @Input() Agregado: string = "Agregado";

  public isError = false;

  ngOnInit() {
  }

  onSaveContact(contactForm: NgForm): void {
    if(contactForm.valid) {
      contactForm.value.userUid = this.userUid;
      contactForm.value.accion = this.Agregado;
      console.log('Contact', contactForm.value);
        this.dataCont.addContact(contactForm.value);
        console.log('Control', contactForm.value);
        this.dataContr.addControl(contactForm.value);
    } else {
      console.log('Form NO valido');
    }
    contactForm.resetForm();
    this.btnClose.nativeElement.click();
  }
}
