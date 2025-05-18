import { Component, Input } from '@angular/core';
import { Review, User } from '../../../public/assets/interfaces';
import { NgClass, NgStyle } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReviewTimePipe } from '../review-time.pipe';
import { ReviewService } from '../review.service';
import { InputVelemenyEditComponent } from '../input-velemeny-edit/input-velemeny-edit.component';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { firstValueFrom, map, Observable } from 'rxjs';
@Component({
  selector: 'app-velemeny-card',
  imports: [MatDialogModule,NgClass,NgStyle,ReviewTimePipe,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatCardModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './velemeny-card.component.html',
  styleUrl: './velemeny-card.component.scss'
})
export class VelemenyCardComponent {

  @Input() review:Review = {
    id:"",
    userid:"",
    name:"",
    body:"",
    time:""

  }
  edited: string = '';
  reviews:Review[] =[]
  user: User |undefined;
  constructor (private reviewService:ReviewService,public authService:AuthService, public userService:UserService,private dialog: MatDialog,){
      this.reviewService.getReviews().subscribe(rev =>{
          this.reviews = rev
      })
      this.userService.getUser().subscribe(u =>{
        this.user = u;
      })
  }

    myReview(review:Review):boolean {
          return review.userid == this.user?.id
  
    }
    deleteReview(review:Review) {
     this.reviewService.deleteService(review.id)
    }
    editReview(review:Review) {
      let date = new Date();
      review.time= date.getFullYear()+"."+date.getMonth()+"."+date.getDay()+" "+date.getHours()+":"+date.getMinutes() + " (szerkesztve)"
     this.reviewService.updateReview(review.id,review)
    }
      nyitDialog(review:Review) {
    const dialogRef = this.dialog.open(InputVelemenyEditComponent, {
      width: '300px',
      data: { title: 'Szerkesztés', inputText: review.body },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.edited = result;
        review.body = this.edited;
        this.editReview(review)
        console.log("Felhasználói bemenet:", result);
        // itt mentheted is pl. service-be
      }
    });

  }
}
