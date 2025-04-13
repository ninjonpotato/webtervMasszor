import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { Review } from '../../../public/assets/interfaces';
import { reviews } from '../../../public/assets/velemenyek';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-velemenyek',
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatCardModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './velemenyek.component.html',
  styleUrl: './velemenyek.component.scss',
})
export class VelemenyekComponent {

  reviews:Review[] = reviews
  uzenet = new FormControl('')
  nev = new FormControl('')

  velemenyez() {
    reviews.push({name:this.nev.value || "",body:this.uzenet.value || ""})
  }
}
