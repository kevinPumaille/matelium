import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';


@NgModule({
  declarations: [
    LoginPage,
    RegisterPage
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    
  ]
})
export class AuthModule { }
