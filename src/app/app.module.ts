import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { TestimoniesComponent } from './layout/testimonies/testimonies.component';
import { AboutUsComponent } from './layout/about-us/about-us.component';
import { ServicesComponent } from './layout/services/services.component';
import { MainComponent } from './layout/main/main.component';
import { RequestFormComponent } from './core/request-form/request-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TestimoniesComponent,
    AboutUsComponent,
    ServicesComponent,
    MainComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents:[
    RequestFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
