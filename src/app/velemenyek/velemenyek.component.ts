import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { Review, User } from '../../../public/assets/interfaces';
import { reviews } from '../../../public/assets/velemenyek';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ReviewTimePipe } from '../review-time.pipe';
import { ReviewService } from '../review.service';
import {NgClass, NgStyle} from '@angular/common';
import { InputVelemenyEditComponent } from '../input-velemeny-edit/input-velemeny-edit.component';
import { AuthService } from '../auth.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { VelemenyCardComponent } from '../velemeny-card/velemeny-card.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-velemenyek',
  imports: [VelemenyCardComponent,MatDialogModule,NgClass,NgStyle,ReviewTimePipe,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatCardModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './velemenyek.component.html',
  styleUrl: './velemenyek.component.scss',
})
export class VelemenyekComponent implements OnInit, OnDestroy {
constructor(private reviewService:ReviewService,private dialog: MatDialog, public authService: AuthService,private userService:UserService) {
}

  reviews:Review[] = []
  myReviews:Review[] = [];
  user: User | null | undefined
  get isLoggedIn():boolean {
    return true
  }
  feliratkozas!: Subscription
  size = 0;
  async ngOnInit(): Promise<void> {

    const user = await firstValueFrom(this.authService.getCurrentUser());
  if (user) {
    this.reviewService.getReviews().then(reviews => {
      console.log("Felhasználó review-jai:", reviews);
      this.reviews = reviews; // ha a HTML-ben is ki akarod írni
    });
  }


   this.feliratkozas = this.reviewService.getMyReviews().subscribe(data =>{
    this.myReviews = data;
   })
this.userService.getUser().subscribe(user =>{
  if(this.authService.LoggedIn){
          this.user = user;
      console.log(this.user)
  }

    })
  
  }
    ngOnDestroy(): void {
      this.reviews = []
        this.feliratkozas.unsubscribe()
      
  }


  uzenet = new FormControl('')
  nev = new FormControl('')
  
  velemenyez() {
    if(this.authService.getStatus()){
   const date = new Date();
  const year = date.getFullYear();     // pl. 2025
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 2 számjegyű hónap
  const day = date.getDate().toString().padStart(2, '0');   
  const formatted = `${year}.${month}.${day}`;
    this.reviewService.addReview(this.user!.name, this.uzenet.value || "szótlanul maradtam..", formatted)
  .then(() => {
    console.log("Review sikeresen hozzáadva.");
  })
  .catch((error) => {
    console.error("Hiba a review hozzáadásánál:", error);
  });

   // this.reviewService.addMyReview(review)
    }
    else {
      alert("Nem szabadna ezt megnyomnod..")
    }
  }
}
