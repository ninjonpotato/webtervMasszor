import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Service } from '../../../public/assets/interfaces';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-service-card',
  imports: [MatCard,MatCardContent,MatCardTitle,MatCardHeader],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss'
})
export class ServiceCardComponent {
  @Output() kattintas = new EventEmitter<Service>();
  @Input() service:Service = {
    name:"Név",
    selected: false,
    employees: [],
    img: "img",
    text: "uzenet"
  }
  serviceName = "név"
  serviceImg = "img"
  serviceText = "üzenet"
kivalaszt() {
  this.kattintas.emit(this.service)
  //this.router.navigate(["/idopont"],{state:{service:s}});
}
}
