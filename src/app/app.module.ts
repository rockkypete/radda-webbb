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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RequestFormComponent } from './core/request-form/request-form.component';
import { ShareModule } from './share/share.module';
import { HttpClientModule } from '@angular/common/http';
import { GoogleMapsModule } from '@angular/google-maps';
import { DialogHeaderComponent } from './layout/dialog-header/dialog-header.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { BaseComponent } from './core/base/base.component';
import { RegisterComponent } from './auth/register/register.component';
import { DeliveryComponent } from './core/delivery/delivery.component';
import { LocationsComponent } from './layout/locations/locations.component';
import { ChecklistComponent } from './layout/checklist/checklist.component';
import { AdditemComponent } from './layout/additem/additem.component';
import { AddFundsComponent } from './layout/add-funds/add-funds.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    TestimoniesComponent,
    AboutUsComponent,
    ServicesComponent,
    MainComponent,
    RequestFormComponent,
    FooterComponent,
    HomeComponent,
    TestimoniesComponent,
    AboutUsComponent,
    MainComponent,
    HeaderComponent,
    DialogHeaderComponent,
    DashboardComponent,
    LoginComponent,
    BaseComponent,
    RegisterComponent,
    DeliveryComponent,
    LocationsComponent,
    ChecklistComponent,
    AdditemComponent,
    AddFundsComponent,

  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    BrowserAnimationsModule,
   ShareModule,
   GooglePlaceModule,
   HttpClientModule,
   GoogleMapsModule,






  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
