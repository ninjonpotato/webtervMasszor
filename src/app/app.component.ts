import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FooldalComponent } from './fooldal/fooldal.component';
import { IdopontComponent } from './idopont/idopont.component';
import { RolunkComponent } from './rolunk/rolunk.component';
import { VelemenyekComponent } from './velemenyek/velemenyek.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MenuComponent,FooldalComponent,IdopontComponent,RolunkComponent,VelemenyekComponent,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'masszor';
  page = "fooldal"
}
