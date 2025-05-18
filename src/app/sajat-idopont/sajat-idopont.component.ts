import { Component, OnInit } from '@angular/core';
import { IdopontCardComponent } from '../idopont-card/idopont-card.component';
import { Idopot, User } from '../../../public/assets/interfaces';
import { IdopontServiceService } from '../idopont-service.service';
import { UserService } from '../user.service';
import { NgClass } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-sajat-idopont',
  imports: [IdopontCardComponent,NgClass,MatButtonModule,MatInputModule,MatFormFieldModule,FormsModule,MatCardModule,ReactiveFormsModule,MatPaginatorModule],
  templateUrl: './sajat-idopont.component.html',
  styleUrl: './sajat-idopont.component.scss'
})
export class SajatIdopontComponent implements OnInit {
    datum = new FormControl()
    nev = new FormControl()
    service = new FormControl()
 public idopontok:Idopot[] = []
 private user:User | undefined
  constructor(private idopontService:IdopontServiceService, private userService:UserService) {

  }
/**
 * 
 *     id:string,
    kinel:string,
    mikor:string,
    nap:string,
    tipus:string,
    userId:string
 */
  search() {
    let i:Idopot = {
      id:"",
      kinel:this.nev.value,
      mikor:this.datum.value,
      tipus:this.service.value,
      nap:"",
      userId:""
      
    } 
    this.idopontService.filterByObj(i).subscribe(szurt => {
      this.idopontok = szurt;
    });
  }
rendezIdopont(event: { i: Idopot, t: string }) {
  if (event.t === 'datum') {
    this.idopontService.filterByIdo(event.i).subscribe(szurt => {
      this.idopontok = szurt;
    });
  } else if (event.t === 'tipus') {
    this.idopontService.filterByType(event.i).subscribe(szurt => {
      this.idopontok = szurt;
    });
  }else if(event.t === "nev") {
    this.idopontService.filterByName(event.i).subscribe(szurt => {
      this.idopontok = szurt;
    });
  }
}
rendezTipus(ido: Idopot) {
  this.idopontService.filterByIdo(ido).subscribe(szurt => {
    this.idopontok = szurt;
  });
}
rendezNev(ido: Idopot) {
  this.idopontService.filterByIdo(ido).subscribe(szurt => {
    this.idopontok = szurt;
  });
}
reset() {
  this.idopontService.getIdopontsByUserId(this.user!.id).subscribe(szurt => {
    this.idopontok = szurt;
  });
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
