import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ControlComponent } from './components/control/control/control.component';
import { ContactComponent } from './components/admin/contact/contact.component';
import { LoginComponent } from 'src/app/components/users/login/login.component';
import { RegisterComponent } from 'src/app/components/users/register/register.component';
import { ProfileComponent } from 'src/app/components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'control', component: ControlComponent, canActivate: [AuthGuard] },
  { path: 'admin/contact', component: ContactComponent, canActivate: [AuthGuard] },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: Page404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
