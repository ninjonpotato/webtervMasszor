import { Injectable } from '@angular/core';
import { Review } from '../../public/assets/interfaces';
import { firstValueFrom, Observable, of } from 'rxjs';
import { doc, collection, setDoc,Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private firestore:Firestore,private authService:AuthService) {
    
   }
   private reviews:Review[] = [];
    public myReviews:Review[] =[];
    
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
    getMyReviews():Observable<Review[]> {
         return of(this.myReviews);
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

  getReviewsByUserId(userId: string): Promise<Review[]> {
  const reviewsRef = collection(this.firestore, 'Reviews');
  const q = query(reviewsRef, where('userid', '==', userId));

  return getDocs(q).then(snapshot => {
    return snapshot.docs.map(doc => doc.data() as Review);
  });
}

  getReviews(): Promise<Review[]> {
  const reviewsRef = collection(this.firestore, 'Reviews');
  const q = query(reviewsRef);

  return getDocs(q).then(snapshot => {
    return snapshot.docs.map(doc => doc.data() as Review);
  });
}


     updateReview(upReview: Review): Observable<Review> {
      let index = this.reviews.findIndex(u => this.egyezik(u,upReview))
          if (index > -1) {
       this.reviews[index] = upReview;
          }
        return of(upReview);
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
  
     deleteService(Review:Review): Observable<boolean> {
      const index = this.reviews.findIndex(u => this.egyezik(u,Review));
      const index2 = this.myReviews.findIndex(u => this.egyezik(u,Review));
      if (index > -1 && index2 > -1) {
        this.reviews.splice(index, 1);
        this.myReviews.splice(index2, 1);
        console.log("Törlés sikeres")
        return of(true);
      }else {
        console.log("Nem sikerült a törlés")
      }
      return of(false);
    }
      createReview(reviewid:string,review:Review):Promise<void> {
        const reviewRef = doc(collection(this.firestore, 'Reviews'), reviewid);
        return setDoc(reviewRef, review);
    }

}
