import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReviewTimePipe } from '../review-time.pipe';
import { ReviewService } from '../review.service';
import { Review,User } from '../../../public/assets/interfaces';
import { reviews } from '../../../public/assets/velemenyek';
import { VelemenyCardComponent } from '../velemeny-card/velemeny-card.component';
import { AuthService } from '../auth.service';
import { User as FUser } from '@angular/fire/auth';
import { UserService } from '../user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-fiok',
  imports: [VelemenyCardComponent,MatDialogModule,MatCardModule,NgClass,NgStyle,ReviewTimePipe,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './fiok.component.html',
  styleUrl: './fiok.component.scss'
})
export class FiokComponent implements OnInit {

  myReviews:Review[] = []
  user:User | null | undefined;
  constructor(private reviewService:ReviewService, private userService: UserService) {
   this.reviewService.getMyReviews().subscribe(data =>{
    this.myReviews = data;

   })
  }
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user =>{
      this.user = user;
      console.log(this.user)
    })

     const user = await firstValueFrom(this.userService.getUser());
      if (this.user) {
        this.reviewService.getReviewsByUserId(this.user.id).then(reviews => {
          console.log("Felhasználó review-jai:", reviews);
          this.myReviews = reviews; // ha a HTML-ben is ki akarod írni
        });
      }
  }
}
