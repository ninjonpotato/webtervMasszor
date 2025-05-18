import { Injectable } from '@angular/core';
import { Employee } from '../../public/assets/interfaces';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor() { }
   private Employees:[Employee] = [{
      name:"",
      selected:false,
      leiras:"",
      img:""
    }];
    addEmployee(Employee:Employee):Observable<Employee>{
     this.Employees.push(Employee);
       return of(Employee);
    }
    getEmployees(): Observable<Employee[]> {
      return of(this.Employees);
    }
    getEmployee(name:string, selected:boolean, leiras:string, img:string):Promise<Employee | undefined>{
      let tmpU:Employee = {name:name, selected:selected, leiras:leiras,img:img};
      let Employee = this.Employees.find(u => this.egyezik(u,tmpU))
      return new Promise((resolve,reject) => {
        setTimeout(()=>{
          resolve(Employee)
        })
      });
    }
  
     updateEmployee(upEmployee: Employee): Observable<Employee> {
      let index = this.Employees.findIndex(u => this.reszbenEgyezik(u,upEmployee))
          if (index > -1) {
       this.Employees[index] = upEmployee;
          }
        return of(upEmployee);
     }
  
     egyezik(u1:Employee, u2:Employee):boolean {
    if(u1.name == u2.name && u1.leiras == u2.leiras) {
      return true;
    }
    return false;
     }
     
     reszbenEgyezik(u1:Employee, u2:Employee):boolean {
       if(u1.name == u2.name && u1.leiras == u2.leiras || u1.name == u2.name && u2.leiras != u1.leiras || u1.leiras == u2.leiras && u1.name != u2.name ) {
      return true;
    }
    return false;
     }
     deleteEmployee(Employee:Employee): Observable<boolean> {
      const index = this.Employees.findIndex(u => this.egyezik(u,Employee));
      if (index > -1) {
        this.Employees.splice(index, 1);
        return of(true);
      }
      return of(false);
    }
}
