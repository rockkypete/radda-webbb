import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { ApiService } from 'src/app/share/appServices/api.service';
import { GoogleService } from 'src/app/share/appServices/google.service';

import { AdditemComponent } from 'src/app/layout/additem/additem.component';
import { ChecklistComponent } from 'src/app/layout/checklist/checklist.component';
import { itemLocation, request } from 'src/app/share/model';
import { LocationsComponent } from 'src/app/layout/locations/locations.component';
import { item } from 'src/app/share/model';




@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {

  @ViewChild("pickup") pickupPlacesRef : GooglePlaceDirective;
  @ViewChild("dropoff") dropoffPlaceRef  : GooglePlaceDirective;

  @ViewChild("files") imageRef  : HTMLInputElement;
  

  
  step:number
  currentUser:string;
  userBalance:number;
  isFunded:boolean;
  itemList:item[];
  locations:itemLocation[];
  checkList:string[];

  itemDetailsForm: FormGroup;
  pickupContactForm: FormGroup;
  deliveryContactForm: FormGroup;
  routingForm: FormGroup;
  registerForm: FormGroup;

  shippingFee: number;

  imageIcon: boolean = true;
  isFile: boolean = false;
  imageFile:string;

  imageSrc:string;
  imageId:string;

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

  dialogConfig:MatDialogConfig;

  constructor(
    private fb:FormBuilder, private gs: GoogleService, private apiService:ApiService,
    private router:Router,
    private dialogRef: MatDialog
  ) { }

  ngOnInit(): void {
    this.step = 1;
    this.itemList.push({} as item);
    this.shippingFee = 0;
    
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

    this.pickupContactForm = this.fb.group({
      contactPhone:['', Validators.required]
    })

    this.deliveryContactForm = this.fb.group({
      contactPhone:['', Validators.required]
    })

    this.registerForm = this.fb.group({
      userName:['', Validators.required],
      email:['', Validators.required],
      phone:['', Validators.required],
      password:['', Validators.required],
      password2:['', Validators.required]
    })

  }

  routeHome(){
    this.router.navigate(['/']);
  }

  formatPickupAddress(address:Address){
    this.itemList[0].locations![0].pickupAddress = address.formatted_address;
    this.itemList[0].locations![0].pickupLatitude = address.geometry.location.lat();
    this.itemList[0].locations![0].pickupLongitude = address.geometry.location.lng();
  }

  formatDeliveryAddress(address:Address){
    this.itemList[0].locations![0].deliveryAddress = address.formatted_address;
    this.itemList[0].locations![0].deliveryLatitude = address.geometry.location.lat();
    this.itemList[0].locations![0].deliveryLongitude = address.geometry.location.lng();
  }

  //getting the distance between the locations
  getTravelDistance(){

    const distanceService = new google.maps.DistanceMatrixService();
    
    const origin = { lat: this.itemList[0].locations![0].pickupLatitude!, lng: this.itemList[0].locations![0].pickupLatitude! };
    const destination = {lat: this.itemList[0].locations![0].deliveryLatitude!, lng: this.itemList[0].locations![0].deliveryLongitude!};
    
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
        this.itemList[0].shipping = res.shippingFee;
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
        this.itemList[0].imageUrl = (res as {imageUrl:string, imageId:string}).imageUrl;
        this.itemList[0].imageId = (res as {imageUrl:string, imageId:string}).imageId;
      })
    }
  }

  addItem(){
    this.dialogConfig = new MatDialogConfig();

    this.dialogConfig.width= '600px';
    this.dialogConfig.height = '550px';
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = false;
    
    this.dialogRef.open(
      AdditemComponent,
      this.dialogConfig
    ).afterClosed().subscribe((item:item)=>{
      console.log(item)
      this.shippingFee += item.shipping!;
      this.itemList.push(item);
    })
  }

  //edit location
  editLocation(){
    this.dialogConfig = new MatDialogConfig();

    this.dialogConfig.width= '600px';
    this.dialogConfig.height = '550px';
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = false;
    this.dialogConfig.data = this.itemList[0].locations![0]
    
    this.dialogRef.open(
      LocationsComponent,
      this.dialogConfig
    ).afterClosed().subscribe((locationUpdate:any)=>{
      this.itemList[0].locations![0].pickupAddress = locationUpdate.pickup
      this.itemList[0].locations![0].deliveryAddress = locationUpdate.delivery
      this.itemList[0].shipping = locationUpdate.shipping
    })
  }

  //get user balance
  authUser(phone:string){
    this.apiService.checkPhoneNumber(phone).subscribe((res:any)=>{
      this.dialogRef.closeAll();
      if(res.success === false){
        //goto registration page
        this.step = 5;
      }else{
        //goto password form for login
        this.currentUser = phone;
        this.step = 4;
      } 
    })
  }

  login(password:string){
    this.apiService.login({phone:this.currentUser, password}).subscribe((res:any)=>{
      if(!res.success){
        //alert wrong password
        window.alert('Account does not exist...')
      } 
      //get the current user wallet balance
      this.apiService.getBalance().subscribe((res:any)=>{
        !res.success ? this.userBalance = 0 : this.userBalance = res.userBalance.balance;
        this.isFunded = (res.userBalance.balance > this.shippingFee || res.userBalance.balance === this.shippingFee) ? true : false;
      })
      localStorage.setItem('user', JSON.stringify(res.authUser)); 
      this.step = 6;
    })
  }

  register(){
    const newUser = {
      userName: this.registerForm.get('userName')!.value,
      email: this.registerForm.get('email')!.value, 
      phone: this.registerForm.get('phone')!.value,
      role: 'user',
      password: this.registerForm.get('password')!.value,
      password2: this.registerForm.get('password2')!.value,
      
    }   
    
    this.apiService.register(newUser).subscribe((res: any)=>{
      if(res.success === false){
        //alert invalid data
        window.alert('Invalid credentials...')
        console.log('failed registration...', res)
      }
      
      //save users idToken to localstorage
      localStorage.setItem('user', JSON.stringify(res.registeredUser))
      this.userBalance = 0;
      this.isFunded = false;
      this.step += 1;
    })
  }

  getTotalShipping(){
    return this.itemList.map(item=>item.shipping).reduce((total:number|undefined, start:number|undefined)=>{
      return total!+start!
    })
  }
  

  displayChecks(){
    this.dialogConfig = new MatDialogConfig();

    this.dialogConfig.width= '600px';
    this.dialogConfig.height = '550px';
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = false;
    
    this.dialogRef.open(
      ChecklistComponent,
      this.dialogConfig
    ).afterClosed().subscribe((checks:string)=>{
      console.log(checks)
      this.itemList[0].checkList = checks;
    })
  }

  confirmOrder(){
    this.itemList[0].title = this.itemDetailsForm.get('title')!.value;
    this.itemList[0].quantity = this.itemDetailsForm.get('quantity')!.value;
    this.itemList[0].locations![0].senderPhone = this.pickupContactForm.get('contactPhone')!.value;
    this.itemList[0].locations![0].receiverPhone = this.deliveryContactForm.get('contactPhone')!.value;    
    this.step = 3;
  }

  checkout(){
    let payload = {
      items: this.itemList,
      totalShipment: this.shippingFee
    }
    this.apiService.checkout(payload).subscribe((res:any)=>{
      window.alert(`${res.message}`)
    }) 
    this.router.navigate(['dashboard']);
  }

}
