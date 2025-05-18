import { Injectable } from '@angular/core';
import { User } from '../../public/assets/interfaces';
import { from, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private firestore:Firestore, private authService: AuthService,private router:Router) { }
 
  getUsers(): Observable<any[]> {
      const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, { idField: 'id' }); // `idField`-del lekérheted a dokumentum Firestore ID-ját is
 
  }
  getUser():Observable<any> {
    return this.authService.getCurrentUserData()
  }


async onSignUp(email:string,password:string, name:string):Promise<boolean> {
    try {
      const user = {
        id: '',
        name: name,
        email: email
      };

      const result = await this.authService.singUp(email, password, user);
      console.log('Sikeres regisztráció!', result);
         alert("Sikeres regisztráció")
         return true;
        
      
      // pl. navigálás, értesítés, stb.
    } catch (error) {
      alert("Sikertelen regisztráció")
      console.error('Hiba a regisztrációnál:', error);
        return false;
    }
  }


}
