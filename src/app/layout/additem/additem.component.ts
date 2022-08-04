import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiService } from 'src/app/share/appServices/api.service';
import { GoogleService } from 'src/app/share/appServices/google.service';

import { ItemLocation } from 'src/app/share/model';
import { Item } from 'src/app/share/model';


@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.css']
})
export class AdditemComponent implements OnInit {
  @ViewChild("pickup") pickupPlacesRef : GooglePlaceDirective;
  @ViewChild("dropoff") dropoffPlaceRef  : GooglePlaceDirective;

  @ViewChild("files") imageRef  : HTMLInputElement;


  currentUser:string;
  item:Item;
  locations:ItemLocation[];
  checkList:string[];

  itemDetailsForm: FormGroup;
  contactForm: FormGroup;
  routingForm: FormGroup;

  shippingFee: number = 0;

  imageIcon: boolean = true;
  isFile: boolean = false;
  imageFile:string = '';

  imageSrc:string ='';
  imageId:string = '';

  pickup_meta_data = {
    address:'',
    latitude: 0,
    longitutde:0
  }
  
  delivery_meta_data = {
    address:'',
    latitude: 0,
    longitutde:0
  }

  constructor(
    private fb:FormBuilder, private gs: GoogleService, private apiService:ApiService,
    private dialogRef: MatDialogRef<AdditemComponent>, @Inject(MAT_DIALOG_DATA) private data:Item
  ) { }


  ngOnInit(): void {
    this.item = {} as Item;
    this.imageSrc =  ''

    this.itemDetailsForm = this.fb.group({
      title: ['', Validators.required],      
      quantity: ['', Validators.required],      
      imageLink: ['', Validators.required],
      imageId: ['', Validators.required],
    })

    this.routingForm = this.fb.group({
      pickupAddress: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
    })

    this.contactForm = this.fb.group({
      senderPhone:['', Validators.required],
      receiverPhone:['', Validators.required]
    })

  }

  formatPickupAddress(address:any){
    this.item.locations![0].pickupAddress = address.formatted_address;
    this.item.locations![0].pickupLatitude = address.geometry.location.lat();
    this.item.locations![0].pickupLongitude = address.geometry.location.lng();
  }

  formatDeliveryAddress(address:any){
    this.item.locations![0].deliveryAddress = address.formatted_address;
    this.item.locations![0].deliveryLatitude = address.geometry.location.lat();
    this.item.locations![0].deliveryLongitude = address.geometry.location.lng();


  }

  //getting the distance between the locations
  getTravelDistance(){

    const distanceService = new google.maps.DistanceMatrixService();
    
    const origin = { lat: this.item.locations![0].pickupLatitude!, lng: this.item.locations![0].pickupLongitude! };
    const destination = {lat: this.item.locations![0].deliveryLatitude!, lng: this.item.locations![0].deliveryLongitude!};
    
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
        this.item.shipping= res.shippingFee;
      })
    });
  }

  //submitting image file to cloudinary for url link
  onImageChange(e:any){
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      // const [file] = e.target.files;
      let selectedFile:File = e.target.files[0]
      reader.readAsDataURL(selectedFile);
    
      reader.onload = () => {
        this.imageIcon = false;
        this.isFile = true;
        this.imageFile = reader.result as string;
      }

      //upload to cloudinary
      const fd = new FormData();
      fd.append('image', selectedFile);
      this.apiService.getImageLink(fd).subscribe(res =>{
        this.imageSrc = (res as {imageUrl:string, imageId:string}).imageUrl;
        this.item.imageUrl = (res as {imageUrl:string, imageId:string}).imageUrl;
        this.item.imageId = (res as {imageUrl:string, imageId:string}).imageId;
      })
    }
  }

  addItem(){
    const newItem:Item = this.item;
    //close dialog and send item object to delivery component
    if((newItem.locations![0].pickupAddress === undefined || newItem.locations![0].pickupAddress === '' )
     || (newItem.locations![0].deliveryAddress === undefined || newItem.locations![0].deliveryAddress === '')){
      this.dialogRef.close();
    }
    this.dialogRef.close(newItem);


  }

}
