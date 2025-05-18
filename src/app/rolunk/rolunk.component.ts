import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../public/assets/interfaces';
import { employees } from '../../../public/assets/masszorok';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { NgStyle } from '@angular/common';
import { EmployeeCardComponent } from '../employee-card/employee-card.component';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-rolunk',
  imports: [EmployeeCardComponent, MatCardModule,MatFormField,MatLabel,ReactiveFormsModule,MatButton,MatInput,NgStyle,FormsModule],
  templateUrl: './rolunk.component.html',
  styleUrl: './rolunk.component.scss'
})
export class RolunkComponent implements OnInit {
  constructor(private employeeService:EmployeeService){}
   employees:Employee[] = []
   size= 0;
  ngOnInit(): void {
    let dummy:Employee = {
      name:"",
      selected:false,
      leiras:"",
      img:""
    }
    this.employeeService.deleteEmployee(dummy)
    this.employeeService.getEmployees().subscribe(data =>{
      this.size = data.length
    this.employees = data;
    });
    if(this.size <= 0){
          for(let e of employees) {
 this.employeeService.addEmployee(e);
    }
    }


  }


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
