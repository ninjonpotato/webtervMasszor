import { Injectable, OnInit } from '@angular/core';
import { Review } from '../../public/assets/interfaces';
import { firstValueFrom, from, map, Observable, of } from 'rxjs';
import { doc, collection, setDoc,Firestore, getDocs, query, where, collectionData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ReviewService{
  public reviews:Review[] = [];
    public myReviews:Review[] =[];
  constructor(private firestore:Firestore,private authService:AuthService) {
   }

    
async addReview(name: string, body: string,time:string): Promise<void> {
  try {

    const user =  await firstValueFrom(this.authService.getCurrentUser());
    if (!user) throw new Error('Nincs bejelentkezett felhasználó');
    const review: Review = {
      id: doc(collection(this.firestore, 'Reviews')).id, // véletlenszerű ID generálása
      userid: user.uid,
      name,
      body,
      time
    };

    await this.createReview(review.id,review);
    console.log("Review feltöltve:", review);
  } catch (error) {
    console.error("Hiba a review feltöltésénél:", error);
    throw error;
  }
}


    addMyReview(Review:Review):Observable<Review>{
     this.reviews.push(Review);
     this.myReviews.push(Review);
       return of(Review);
    }
    getreviews(): Observable<Review[]> {
      return of(this.reviews);
    }
    getReview(name:string, pass:string, time:string):Observable<Review | undefined>{
      let tmpU:Review = {id:"",userid:"",name:name, body:pass, time:time};
      let Review = this.reviews.find(u => this.egyezik(u,tmpU))
      return of(Review);
    }
     getReviewWithObj(review: Review):Promise<Review | undefined>{
      let Review = this.reviews.find(u => this.egyezik(u,review))
      return new Promise((resolve,reject) => {
        setTimeout(()=>{
          resolve(Review)
        })
    })
  }

getReviewsByUserId(userId: string): Observable<Review[]> {
  const reviewsRef = collection(this.firestore, 'Reviews');
  const q = query(reviewsRef, where('userid', '==', userId));

  return collectionData(q, { idField: 'id' }) as Observable<Review[]>;
}

  getReviews(): Observable<Review[]> {
  const reviewsRef = collection(this.firestore, 'Reviews');
  return collectionData(reviewsRef, { idField: 'id' }) as Observable<Review[]>;
}

    updateReview(id: string, updatedFields: Partial<Review>): Promise<void> {
  const reviewRef = doc(this.firestore, 'Reviews', id);
  return updateDoc(reviewRef, updatedFields);
}
  
     egyezik(u1:Review, u2:Review):boolean {
    if(u1.name == u2.name && u1.body == u2.body && u1.time == u2.time) {
      return true;
    }
    return false;
     }

     egyezikReszben(u1:Review, u2:Review):boolean {
    if(u1.name == u2.name && u1.body == u2.body && u1.time == u2.time || u1.name==u2.name && u1.time == u2.time && u2.body != u2.body ||u1.name==u2.name ) {
      return true;
    }
    return false;
     }
  
     async deleteService(id:string): Promise<void>{
      try {
        await deleteDoc(doc(this.firestore, 'Reviews', id));
      }
      catch(error) {
         console.error('Hiba törlés közben:', error);
      }
    }
      createReview(reviewid:string,review:Review):Promise<void> {
        const reviewRef = doc(collection(this.firestore, 'Reviews'), reviewid);
        return setDoc(reviewRef, review);
    }

}
