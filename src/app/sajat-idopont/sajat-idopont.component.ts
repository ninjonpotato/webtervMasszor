import { Component, OnInit } from '@angular/core';
import { IdopontCardComponent } from '../idopont-card/idopont-card.component';
import { Idopot, User } from '../../../public/assets/interfaces';
import { IdopontServiceService } from '../idopont-service.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sajat-idopont',
  imports: [IdopontCardComponent],
  templateUrl: './sajat-idopont.component.html',
  styleUrl: './sajat-idopont.component.scss'
})
export class SajatIdopontComponent implements OnInit {
 public idopontok:Idopot[] = []
 private user:User | undefined
  constructor(private idopontService:IdopontServiceService, private userService:UserService) {

  }
  ngOnInit(): void {


    this.userService.getUser().subscribe(u =>{
      this.user = u;
      console.log(this.user)
      this.idopontService.getIdopontsByUserId(this.user!.id).subscribe(data =>{
        console.log(data)
      this.idopontok = data
      console.log(this.idopontok)
    })
    })

  }

}
