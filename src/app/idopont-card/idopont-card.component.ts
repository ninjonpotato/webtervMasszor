import { Component, Input } from '@angular/core';
import { Idopot, Table } from '../../../public/assets/interfaces';
import { IdopontServiceService } from '../idopont-service.service';

@Component({
  selector: 'app-idopont-card',
  imports: [],
  templateUrl: './idopont-card.component.html',
  styleUrl: './idopont-card.component.scss'
})
export class IdopontCardComponent {

  @Input() idopont:Idopot | undefined;

  constructor(private idopontService:IdopontServiceService){}
  cancelIdopont(id:Idopot) {
    this.idopontService.cancelIdopnt(id.id)
  }
}
