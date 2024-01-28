import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { NavbarComponent } from './shared/navbar/navbar.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';

import { APP_ROUTES } from './app.routes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {CategoriaService} from './services/categoria/categoria.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    //NavbarComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule
    //APP_ROUTES,
  ],
  providers: [CategoriaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
