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
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-fiok',
  imports: [VelemenyCardComponent,MatDialogModule,MatCardModule,NgClass,NgStyle,ReviewTimePipe,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './fiok.component.html',
  styleUrl: './fiok.component.scss'
})
export class FiokComponent implements OnInit {

  myReviews:Review[] | undefined
  user:User | undefined;
  constructor(private reviewService:ReviewService, private userService: UserService, private authService:AuthService) {
  }
  async ngOnInit(): Promise<void> {
    this.userService.getUser().subscribe(user =>{
        this.user = user;
          console.log(this.user!.id)
         this.reviewService.getReviewsByUserId(this.user!.id).subscribe(data =>{           
         this.myReviews = data
       })
    })

  }
}
