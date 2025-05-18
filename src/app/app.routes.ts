import { Routes } from '@angular/router';
import { FooldalComponent } from './fooldal/fooldal.component';
import { IdopontComponent } from './idopont/idopont.component';
import { VelemenyekComponent } from './velemenyek/velemenyek.component';
import { RolunkComponent } from './rolunk/rolunk.component';
import { SajatIdopontComponent } from './sajat-idopont/sajat-idopont.component';
import {authGuard, publicGuard} from './auth.guard'

export const routes: Routes = [
{
    path:"fooldal",
    loadComponent: ()=> import('./fooldal/fooldal.component').then(m=>m.FooldalComponent)
},
{
    path:"idopont",
    loadComponent: ()=> import('./idopont/idopont.component').then(m=>m.IdopontComponent),

},
{
    path:"velemenyek",
    loadComponent: ()=> import('./velemenyek/velemenyek.component').then(m=>m.VelemenyekComponent),
     
},
{
    path:"rolunk",
    loadComponent: ()=> import('./rolunk/rolunk.component').then(m=>m.RolunkComponent),
   
},
{
    path:"login",
    loadComponent: ()=> import('./login/login.component').then(m=>m.LoginComponent)
},
{
    path:"fiok",
    loadComponent: ()=> import('./fiok/fiok.component').then(m=>m.FiokComponent),
    canActivate: [authGuard]
},
{
    path:"sajat_idopont",
    loadComponent: ()=> import('./sajat-idopont/sajat-idopont.component').then(m=>m.SajatIdopontComponent),
    canActivate: [authGuard]
},
{path:'',redirectTo: 'home', pathMatch: "full"},
{
    path:"**",
    loadComponent: ()=> import('./fooldal/fooldal.component').then(m=>m.FooldalComponent)
},

];
