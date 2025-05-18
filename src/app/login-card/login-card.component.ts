import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-card',
   imports: [NgClass,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatCardModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './login-card.component.html',
  styleUrl: './login-card.component.scss'
})
export class LoginCardComponent {
 jelszo = new FormControl()
    nev = new FormControl()
        @Output() valtas = new EventEmitter<boolean>();
        constructor (public loginService:AuthService,private route:Router){
  
        }
      login() {
        console.log(this.nev.value)
        this.loginService.signIn(this.nev.value,this.jelszo.value).then(()=>{
          this.loginService.updateUserStatus(true)
           this.route.navigate(['/fooldal'])
        }).catch(error => {
          alert("Érvénytelen belépési adatok")
        })
  }
  valtasToSignUp() {
this.valtas.emit(true)
  }
}
