import { Injectable, OnInit } from '@angular/core';
import { Idopot, Review } from '../../public/assets/interfaces';
import { firstValueFrom, from, map, Observable, of } from 'rxjs';
import { doc, collection, setDoc,Firestore, getDocs, query, where, collectionData, updateDoc, deleteDoc, QueryConstraint } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IdopontServiceService {
  public idopontok:Idopot[]  = []
  constructor(private authService:AuthService, private firestore:Firestore) { }

async addIdopont(kinel:string,mikor:string,nap:string,tipus:string): Promise<void> {
  try {
    const user =  await firstValueFrom(this.authService.getCurrentUser());
    if (!user) throw new Error('Nincs bejelentkezett felhasználó');
    console.log("napy:"+nap)
    const idopont: Idopot = {
      id: doc(collection(this.firestore, 'Idopontok')).id, // véletlenszerű ID generálása
      userId: user.uid,
      kinel,
      mikor,
      nap,
      tipus
    };

    await this.createIdopont(idopont.id,idopont);
    console.log("Idopont lefoglalva:", idopont);
  } catch (error) {
    console.error("Hiba az időpont feltöltésénél:", error);
    throw error;
  }
}
filterByObj(ido:Idopot):Observable<Idopot[]> {
 const reviewsRef = collection(this.firestore, 'Idopontok');

  const constraints: QueryConstraint[] = [];

  if (ido.mikor) {
    constraints.push(where('mikor', '==', ido.mikor));
  }

  if (ido.kinel) {
    constraints.push(where('kinel', '==', ido.kinel));
  }

  if (ido.tipus) {
    constraints.push(where('tipus', '==', ido.tipus));
  }

  const q = query(reviewsRef, ...constraints);

  return collectionData(q, { idField: 'id' }) as Observable<Idopot[]>;
}
filterByIdo(ido:Idopot):Observable<Idopot[]> {
   const reviewsRef = collection(this.firestore, 'Idopontok');
  const q = query(reviewsRef, where('mikor', '==', ido.mikor));
   return collectionData(q, { idField: 'id' }) as Observable<Idopot[]>;
}
filterByType(ido:Idopot):Observable<Idopot[]> {
   const reviewsRef = collection(this.firestore, 'Idopontok');
  const q = query(reviewsRef, where('tipus', '==', ido.tipus));
   return collectionData(q, { idField: 'id' }) as Observable<Idopot[]>;
}
filterByName(ido:Idopot):Observable<Idopot[]> {
   const reviewsRef = collection(this.firestore, 'Idopontok');
  const q = query(reviewsRef, where('kinel', '==', ido.kinel));
   return collectionData(q, { idField: 'id' }) as Observable<Idopot[]>;
}

getIdopontsByUserId(userId: string): Observable<Idopot[]> {
  const reviewsRef = collection(this.firestore, 'Idopontok');
  const q = query(reviewsRef, where('userId', '==', userId));

  return collectionData(q, { idField: 'id' }) as Observable<Idopot[]>;
}

  getIdopont(): Observable<Idopot[]> {
  const reviewsRef = collection(this.firestore, 'Idopontok');
  return collectionData(reviewsRef, { idField: 'id' }) as Observable<Idopot[]>;
}

    updateReview(id: string, updatedFields: Partial<Idopot>): Promise<void> {
  const reviewRef = doc(this.firestore, 'Idopontok', id);
  return updateDoc(reviewRef, updatedFields);
}
  
     async cancelIdopnt(id:string): Promise<void>{
      try {
        await deleteDoc(doc(this.firestore, 'Idopontok', id));
      }
      catch(error) {
         console.error('Hiba törlés közben:', error);
      }
    }

      createIdopont(reviewid:string,review:Idopot):Promise<void> {
        const reviewRef = doc(collection(this.firestore, 'Idopontok'), reviewid);
        return setDoc(reviewRef, review);
    }

}
