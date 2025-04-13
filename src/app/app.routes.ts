import { Routes } from '@angular/router';
import { FooldalComponent } from './fooldal/fooldal.component';
import { IdopontComponent } from './idopont/idopont.component';
import { VelemenyekComponent } from './velemenyek/velemenyek.component';
import { RolunkComponent } from './rolunk/rolunk.component';

export const routes: Routes = [
{
    path:"fooldal",
    loadComponent: ()=> import('./fooldal/fooldal.component').then(m=>m.FooldalComponent)
},
{
    path:"idopont",
    loadComponent: ()=> import('./idopont/idopont.component').then(m=>m.IdopontComponent)
},
{
    path:"velemenyek",
    loadComponent: ()=> import('./velemenyek/velemenyek.component').then(m=>m.VelemenyekComponent)
},
{
    path:"rolunk",
    loadComponent: ()=> import('./rolunk/rolunk.component').then(m=>m.RolunkComponent)
},
{path:'',redirectTo: 'home', pathMatch: "full"},
{
    path:"**",
    loadComponent: ()=> import('./fooldal/fooldal.component').then(m=>m.FooldalComponent)
},

];
