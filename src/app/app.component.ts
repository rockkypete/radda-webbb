import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DeliveryComponent } from './core/delivery/delivery.component';
import { LocationsComponent } from './layout/locations/locations.component';
import { ChecklistComponent } from './layout/checklist/checklist.component';
import { AdditemComponent } from './layout/additem/additem.component';
import { HomeComponent } from './layout/home/home.component';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'radda-web';


}
