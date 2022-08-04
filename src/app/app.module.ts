import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';

import { HomeComponent } from './layout/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DeliveryComponent } from './core/delivery/delivery.component';
import { LocationsComponent } from './layout/locations/locations.component';
import { AdditemComponent } from './layout/additem/additem.component';
import { ChecklistComponent } from './layout/checklist/checklist.component';

import { ApiService } from './share/appServices/api.service';
import { GoogleService } from './share/appServices/google.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent, 
    RegisterComponent,
    DeliveryComponent,
    LocationsComponent,
    ChecklistComponent,
    AdditemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ShareModule,
    GooglePlaceModule,
    HttpClientModule,
    GoogleMapsModule,
    ReactiveFormsModule

  ],


  providers: [
    ApiService,
    GoogleService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
