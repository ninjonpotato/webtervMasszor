import { Component } from '@angular/core';
import { Employee } from '../../../public/assets/interfaces';
import { employees } from '../../../public/assets/masszorok';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-rolunk',
  imports: [MatCardModule,MatFormField,MatLabel,ReactiveFormsModule,MatButton,MatInput,NgStyle,FormsModule],
  templateUrl: './rolunk.component.html',
  styleUrl: './rolunk.component.scss'
})
export class RolunkComponent {
 employees:Employee[] = employees
 email = new FormControl('')
 uzenet = new FormControl('');
 ask() {
  if(this.email.value != '') {
    if(this.uzenet.value != "") {
      alert("Kérdését rövidesen feldolgozzuk!")
    }else {
      alert("Üres üzenet")
    }

  }else {
    alert("Üres cím")
  }
  

 }
 isOpen = false
 show() {
  this.isOpen = !this.isOpen
 }
}
