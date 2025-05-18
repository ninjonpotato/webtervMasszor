import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';


@Component({
  selector: 'app-menu',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {


   constructor(public loginService: AuthService) {
   }
  ngOnInit(): void {
  }
  signOut() {
this.loginService.signOut();
  }


}
