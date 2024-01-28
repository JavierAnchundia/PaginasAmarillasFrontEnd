import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
  {
    path: 'inicio',
    component: PagesComponent,
    
},
  {path: '', pathMatch: 'full', redirectTo: 'inicio'}  
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true, scrollPositionRestoration: 'enabled' } );
