import { Component } from '@angular/core';
import { hirek } from '../../../public/assets/hirek';
import { services } from '../../../public/assets/szolgaltatasok';
import {NgClass, NgStyle} from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Service, Hir } from '../../../public/assets/interfaces';  
import { UppercasePipe } from '../uppercase.pipe';

@Component({
  selector: 'app-fooldal',
  imports: [NgClass,NgStyle,MatCardModule,MatButtonModule,RouterLink,UppercasePipe],
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
atiranyit(s:Service) {
  this.router.navigate(["/idopont"],{state:{service:s}});
}
openHir(h:Hir) {
  this.hir = h
  console.log(this.hir)
  this.isOpen = true;
}
bezarHir() {
this.isOpen = false
}
}
