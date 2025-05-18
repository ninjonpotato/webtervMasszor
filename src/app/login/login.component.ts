import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SignupCardComponent } from '../signup-card/signup-card.component';
import { LoginCardComponent } from '../login-card/login-card.component';

@Component({
  selector: 'app-login',
  imports: [LoginCardComponent,SignupCardComponent,NgClass,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatCardModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    isLogin = true;
    isSignUp = false

    valtasToLogin(ertek:boolean) {
this.isLogin = ertek
this.isSignUp = false
    }
     valtasToSignUp(ertek:boolean) {
this.isSignUp = ertek
this.isLogin = false
    }
}
