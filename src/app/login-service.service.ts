import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from '../../public/assets/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  loggedIn = false;
  isAdmin = false;
  user:User = {
    name: '',
    passwd: '',
    email: ''
  }
  constructor(private route:Router) { }

  login(username: string | undefined, passwod: string | undefined) {
    if(username == "asd" && passwod=="asd") {
    alert("Sikeres belépés")
      this.route.navigate(['/fooldal'])
      this.loggedIn = true;
      this.user.name = username
      this.user.passwd = passwod
    }
    else if(username=="admin" && passwod =="admin") {
        this.route.navigate(['/fooldal'])
      this.isAdmin = true;
         this.loggedIn = true;
    }
     else {
          alert("Sikertelen belépés")
    }
  }
  getUser():User {
    return this.user
  }
  logout() {
    this.loggedIn = false
    this.isAdmin = false
     this.route.navigate(['/login'])
  }
  isLoggedIn() {
    return this.loggedIn;
  } 
  isLoggedAsAdmin() {
    return this.isAdmin;
  } 
}
