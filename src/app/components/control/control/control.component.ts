import { Component, OnInit } from '@angular/core';
import { DataControlService } from '../../../services/data-control.service';
import { ControlInterface } from '../../../models/control';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor(private dataContr: DataControlService, private authService: AuthService) { }
  filterCtrl = '';
  pageActual: number = 1;
  private controls: ControlInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListControls();
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

  getListControls() {
    this.dataContr.getAllControls()
      .subscribe(controls => {
        this.controls = controls;
      });
  }
}
