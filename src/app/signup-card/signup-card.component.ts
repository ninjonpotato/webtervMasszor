import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup-card',
  imports: [NgClass,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatCardModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './signup-card.component.html',
  styleUrl: './signup-card.component.scss'
})
export class SignupCardComponent {
 jelszo = new FormControl('')
    nev = new FormControl('')
    email = new FormControl('')
    constructor(private userService:UserService){}
    @Output() valtas = new EventEmitter<boolean>();
      regisztral() {
        this.userService.onSignUp(this.email.value || "",this.jelszo.value || "",this.nev.value || "",).then(result=>{
          this.valtasToLogin()
        });
  }
  valtasToLogin() {
    this.valtas.emit(true)
  }
}
