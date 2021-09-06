import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialModule } from './../angular-material.module';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
