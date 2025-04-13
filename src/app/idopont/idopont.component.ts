import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { services } from '../../../public/assets/szolgaltatasok'; 
import { employees } from '../../../public/assets/masszorok';  
import { idopontok } from '../../../public/assets/idopontok';  
import { Service, Employee,Table } from '../../../public/assets/interfaces';  
import {NgClass} from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';



@Component({
  selector: 'app-idopont',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,MatChipsModule,MatCardModule,NgClass,MatButton],
  providers: [provideNativeDateAdapter()],
  templateUrl: './idopont.component.html',
  styleUrl: './idopont.component.scss'
})
export class IdopontComponent {

  services = services;
  napok = ["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"]
  employees = employees;
  idopontok = idopontok
  isServiceChoosen = false;
  isEmployeeChoosen = false;
  selectedService:any= "";
  selectedEmployee = ""
  datum: Date | null = null;
  selectedArray: Employee[] = []
  timetable:any = []
  selectedDay = "Hétfő"
  selectedDayfromTable = [] 
  index = 0;
  helyek:Table[] = []

  constructor (private router:Router) {
    this.isServiceChoosen = false;
    this.isEmployeeChoosen = false;
    this.selectedArray = []
    for(let s of services) {
        s.selected = false
    }
    let nav = this.router.getCurrentNavigation();
    let state = nav?.extras.state as {service: Service}
      try {
      this.selectedService = state.service
      this.isServiceChoosen = true
      for(let s of services) {
        if(s.name == this.selectedService.name) {
          s.selected = true
        }
      }
      for(let s of this.selectedService.employees) {
      let e = {name:s,selected:false,leiras:"",img:""} 
      this.selectedArray.push(e)
      }
      }
      catch(error) {
        console.log("Ezzel légyszi ne foglalkozz, ez csak nekem fontos :)")
      } 
      
  }

showEmployees(service: Service) {
  this.selectedArray = []
  for(let s of employees) {
      s.selected = false
  
  }
  if(service.selected==true) {
    this.isServiceChoosen = false
    this.isEmployeeChoosen = false
  }else {
    for(let s of services) {
      if(s.name != service.name) {
        s.selected = false
      }
    }
    this.isEmployeeChoosen = false
    this.isServiceChoosen = true
    this.datum = null
  }
  service.selected =!service.selected
  if(this.isServiceChoosen) {
    this.selectedService = service 
    for(let s of this.selectedService.employees) {
      let e = {name:s,selected:false,leiras:"",img:""} 
      this.selectedArray.push(e)
    }
  }

}
showTime(employee: Employee) {
if(employee.selected) {
  this.isEmployeeChoosen =false
  for(let s of employees) {
    if(s.name != employee.name) {
      s.selected = false
    }
  }
}else {
  this.isEmployeeChoosen =true
}
employee.selected = !employee.selected
this.selectedEmployee = employee.name
}
showTable(event: MatDatepickerInputEvent<Date>) {
this.datum = event.value
let service = this.selectedService.name;
this.timetable = []
for(let i of idopontok)  {
    if(i.service == service && i.employee == this.selectedEmployee) {
    this.timetable = i.timetable
    this.selectedDay = this.napok[this.index]
    for(let h of this.timetable) {
      let tab:Table = {time:h.time, hely:h.reserved[this.index]}
      this.helyek.push(tab)
    }
    }
  }
}

helyetFoglal(event:any, index:number, h:any) {
  if(h != "foglalt") {
    let p = prompt("Milyen néven szeretnéd lefoglalni?")
      h = "foglalt"
      if(index == -1) {
        event.hely = h
      }else {
        event.reserved[index] = h
      }


  }

}
elozo() {
  this.helyek = []
if(this.index == 0) {
  this.index = this.napok.length-1;
}else {
  this.index--;
}
this.selectedDay = this.napok[this.index]
for(let h of this.timetable) {
  let tab:Table = {time:h.time, hely:h.reserved[this.index]}
  this.helyek.push(tab)
}
}
kovi() {
  this.helyek = []
  if(this.index == this.napok.length-1) {
    this.index = 0;
  }else {
    this.index++;
  }
  this.selectedDay = this.napok[this.index]
for(let h of this.timetable) {
  let tab:Table = {time:h.time, hely:h.reserved[this.index]}
  this.helyek.push(tab)
}
}
}
