import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiService } from 'src/app/share/appServices/api.service';
import { GoogleService } from 'src/app/share/appServices/google.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  @ViewChild("pickup") pickupPlacesRef : GooglePlaceDirective;
  @ViewChild("dropoff") dropoffPlaceRef  : GooglePlaceDirective;

  routingForm: FormGroup;
  shippingFee: number;

  pickup_meta_data = {
    address:'',
    latitude: 0,
    longitude:0
  }
  
  delivery_meta_data = {
    address:'',
    latitude: 0,
    longitude:0
  }

  dialogConfig:MatDialogConfig;


  constructor(
    private fb:FormBuilder, private gs: GoogleService, private apiService:ApiService,
    private dialogRef: MatDialogRef<LocationsComponent>, @Inject(MAT_DIALOG_DATA) private data:{pickup:string, delivery:string}
  ) { }

  ngOnInit(): void {
    this.shippingFee = 0;
    this.routingForm = this.fb.group({
      pickupAddress: [this.data.pickup, Validators.required],
      deliveryAddress: [this.data.delivery, Validators.required],
    })
  }

  formatPickupAddress(address:Address){
    this.pickup_meta_data.address = address.formatted_address;
    this.pickup_meta_data.latitude = address.geometry.location.lat();
    this.pickup_meta_data.longitude = address.geometry.location.lng();
  }
  formatDeliveryAddress(address:Address){
    this.delivery_meta_data.address = address.formatted_address;
    this.delivery_meta_data.latitude = address.geometry.location.lat();
    this.delivery_meta_data.longitude = address.geometry.location.lng();
  }

  //getting the distance between the locations
  getTravelDistance(){

    const distanceService = new google.maps.DistanceMatrixService();
    
    const origin = { lat: this.pickup_meta_data.latitude!, lng: this.pickup_meta_data.longitude! };
    const destination = {lat: this.delivery_meta_data.latitude!, lng: this.delivery_meta_data.longitude!};
    
    const request = {
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    distanceService.getDistanceMatrix(request).then((response) => {
      let distance = response.rows[0].elements[0].distance.value

      this.apiService.getCost(distance).subscribe((res:any)=>{
        this.shippingFee = res.shippingFee;
      })
    });
  }

  updateLocation(){
    const locationUpdate = {
      pickup: this.pickup_meta_data.address,
      delivery: this.delivery_meta_data.address,
      shipping: this.shippingFee
    }
    this.dialogRef.close(locationUpdate)
  }

}
