import { Component } from '@angular/core';
import { hirek } from '../../../public/assets/hirek';
import { services } from '../../../public/assets/szolgaltatasok';
import {NgClass, NgStyle} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Service, Hir } from '../../../public/assets/interfaces';  
import { UppercasePipe } from '../uppercase.pipe';
import { ServiceCardComponent } from '../service-card/service-card.component';
import { MatDivider } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-fooldal',
  imports: [NgClass,NgStyle,MatCardModule,MatButtonModule,RouterLink,UppercasePipe,ServiceCardComponent,MatDivider,MatListModule,MatProgressSpinnerModule],
  templateUrl: './fooldal.component.html',
  styleUrl: './fooldal.component.scss'
})
export class FooldalComponent {
hirek:Hir[] = hirek;
services = services
hir:Hir = {
  headline:"Hír!",
  text:"Üzenet!",
  img:"assets/Images/new-member.jpeg"
};
isOpen = false;
constructor(private router:Router) {

}
openHir(h:Hir) {
  this.hir = h
  console.log(this.hir)
  this.isOpen = true;
}
bezarHir() {
this.isOpen = false
}
atiranyit(s: any) {
 // console.log(s)
  this.router.navigate(["/idopont"],{state:{service:s}});
} 
}
