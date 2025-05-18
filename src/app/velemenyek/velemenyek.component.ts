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
import { firstValueFrom, Observable, Subscription } from 'rxjs';
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
  user: User| undefined
  get isLoggedIn():boolean {
    return true
  }
  feliratkozas!: Subscription
  size = 0;
  ngOnInit(){
    this.userService.getUser().subscribe(u =>{
      this.user = u
    });
   this.feliratkozas = this.reviewService.getReviews().subscribe(data =>{
    this.reviews = data
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
  const year = date.getFullYear();     
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');   
  const formatted = `${year}.${month}.${day}`;
 this.userService.getUser().subscribe(data=>{
this.user = data
  })
    this.reviewService.addReview(this.user!.name, this.uzenet.value || "szótlanul maradtam..", formatted)
  .then(() => {
    console.log("Review sikeresen hozzáadva.");
  })
  .catch((error) => {
    console.error("Hiba a review hozzáadásánál:", error);
  });
    }
    else {
      alert("Nem szabadna ezt megnyomnod..")
    }
  }
}
