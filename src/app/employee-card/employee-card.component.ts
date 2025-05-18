import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Employee } from '../../../public/assets/interfaces';

@Component({
  selector: 'app-employee-card',
  imports: [MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatCardModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './employee-card.component.html',
  styleUrl: './employee-card.component.scss'
})
export class EmployeeCardComponent {
 @Input() employee:Employee = {
   name: "Név",
   img: "img",
   leiras: "uzenet",
   selected: false
 }
  serviceName = "név"
  serviceImg = "img"
  serviceText = "üzenet"
}
