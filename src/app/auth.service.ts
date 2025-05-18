import { Injectable } from '@angular/core';
import {
  Auth,signInWithEmailAndPassword,signOut,authState,User as FUser,UserCredential,
  createUserWithEmailAndPassword
} from '@angular/fire/auth'
import { addDoc, collection, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Review, User } from '../../public/assets/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  LoggedIn = false;
currentUser: Observable<FUser | null>
  constructor(private auth:Auth,private router:Router, private firestore:Firestore) {
    this.currentUser = authState(auth)

    this.currentUser.subscribe(user => {
    this.LoggedIn = !!user;
  });
  }

  signIn(email:string,passwd:string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth,email,passwd)
  }
  signOut():Promise<void> {
   this.updateUserStatus(false)
    return signOut(this.auth).then(()=>{
       this.currentUser = authState(this.auth)
        this.router.navigateByUrl("/home")
    })
  }

  isLoggedIn(): Observable<FUser | null> {
    return this.currentUser
  }
  getCurrentUser(): Observable<FUser | null> {
  return authState(this.auth);
}

getCurrentUserData(): Observable<any | undefined> {
  return this.getCurrentUser().pipe(
    switchMap(user => {
      if (!user) return of(undefined);
      return docData(doc(this.firestore, 'Users', user.uid));
    })
  );
}

  updateUserStatus(isLoggedIn: boolean) {
    this.LoggedIn = isLoggedIn
  }
  getStatus():boolean {
    return this.LoggedIn
  }

  async singUp(email:string, password:string, user:User):Promise<UserCredential>{
    try{
      const creds = await createUserWithEmailAndPassword(this.auth,email,password)
      await this.createUser(creds.user.uid, {
        ...user,
        id: creds.user.uid,
        email:email
      });
      return creds;
    }
    catch(error){
      console.log("hiba regisztrációnál")
      console.log(email)
        console.log(password)
                  console.log(user)
      throw error
    }
  }

  private createUser(userid:string,user:User):Promise<void> {
    const userRef = doc(collection(this.firestore,'Users'),userid)
    return setDoc(userRef,user)
  }

}
