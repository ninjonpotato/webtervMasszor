import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { services } from '../../../public/assets/szolgaltatasok'; 
import { employees } from '../../../public/assets/masszorok';  
import { Service, Employee,Table, User, Idopot } from '../../../public/assets/interfaces';  
import {NgClass, NgStyle} from '@angular/common';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IdopontServiceService } from '../idopont-service.service';
import { UserService } from '../user.service';
import { idopontok } from '../../../public/assets/idopontok';



@Component({
  selector: 'app-idopont',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,MatChipsModule,MatCardModule,NgClass,MatButton,MatProgressSpinnerModule,NgStyle],
  providers: [provideNativeDateAdapter()],
  templateUrl: './idopont.component.html',
  styleUrl: './idopont.component.scss'
})
export class IdopontComponent implements OnInit {

  services = services;
  napok = ["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"]
  employees = employees;
  idopontok =idopontok
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
  isLoading = false
  user:User | undefined;
  foglaltIdopontok:Idopot[] | undefined
  constructor (private router:Router, private idopontService:IdopontServiceService,private userService:UserService) {
    this.isServiceChoosen = false;
    this.isEmployeeChoosen = false;
    this.selectedArray = []
    idopontService.getIdopont().subscribe(data=>{
      this.foglaltIdopontok = data
    })
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
  ngOnInit(): void {
    this.userService.getUser().subscribe(u=>{
      this.user = u
    })
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
    let index = 0
    for(let h of this.timetable) {
      console.log(this.timetable)
       for(let t of this.foglaltIdopontok!) {
        let idoSplit = t.mikor.split(" ")
        let hSplit = h.time.split(" ")

        if(idoSplit[1] == hSplit[0]) {
          for(let n in this.napok) {
            if(this.napok[n] == t.nap) {
             h.reserved[n] = "foglalt"
            }
          }
       
        }
       }
      let tab:Table = {time:h.time, hely:h.reserved[this.index]}
      this.helyek.push(tab)
      index++;
    }
    }
  }
  //Ez akkor fut le ha nincs ehez időpont kötve
  let dummyIdo = ["8:00 9:00","9:00 10:00","11:00 12:00", "12:00 13:00", "13:00 14:00"]
if(this.timetable.length < 1) {
  console.log("üres a timetable")
  for(let ido of dummyIdo) {
      let e = {time:ido, reserved: ["hely","hely","hely","hely","hely","hely"]}
        for(let t of this.foglaltIdopontok!) {
        let idoSplit = t.mikor.split(" ")
        let ido = idoSplit[1].split(":") 
        let hSplit = e.time.split(" ")
        console.log(hSplit)
        if(ido[0]+":00" == hSplit[0] && this.selectedService.name == t.tipus && this.selectedEmployee == t.kinel) {
          console.log()
          e.reserved[this.index] = "foglalt"
        }
       }
      this.timetable.push(e)
    
  }
}
}

helyetFoglal(event:any, index:number, h:any) {
  if(h != "foglalt") {
    this.isLoading = true
    setTimeout(()=>{
      this.isLoading = false
      h = "foglalt"
      if(index == -1) {
        event.hely = h
        console.log("első")
      }else {

   const date = new Date();
  const year = date.getFullYear();     
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');   
  let hSplit = event.time.split(" ")
  const formatted = `${year}.${month}.${day} ${hSplit[0]}`;
  this.idopontService.addIdopont(this.selectedEmployee,formatted,this.napok[index],this.selectedService.name).then(() => {
  })
  .catch((error) => {
    console.error("Hiba a időpont foglalásnál hozzáadásánál:", error);
  });
        event.reserved[index] = h
      }
    },1000)
      



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
