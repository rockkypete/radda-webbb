import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { ApiService } from 'src/app/share/appServices/api.service';
import { GoogleService } from 'src/app/share/appServices/google.service';
import { request } from 'src/app/share/model';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css'],
})
export class RequestFormComponent implements OnInit {
  @ViewChild('placesRef') placesRef: GooglePlaceDirective;
  @ViewChild('map') mapElement: any;

  map: google.maps.Map;

  formattedaddress = ' ';
  options = {
    componentRestrictions: { country: 'NG' },
    fields: ['formatted_address'],
    types: ['address'],
  };

  state: any = [
    { name: 'Lagos', value: 'lagos' },
    { name: 'Ogun', value: 'ogun' },
    { name: 'Oyo', value: 'oyo' },
  ];
  medium: any = [
    { name: 'Bike', value: 'I want to send an item' },
    { name: 'Car', value: 'I want to receive a parcel' },
  ];

  category: any = [
    { name: 'Bike', value: 'Small' },
    { name: 'Car', value: 'light' },
    { name: 'Car', value: 'medium' },
    { name: 'Car', value: 'Heavy' },
  ];

  quantity: any = [
    { name: 'Bike', value: '1' },
    { name: 'Car', value: '2' },
    { name: 'Car', value: '3' },
    { name: 'Car', value: '4' },
    { name: 'Car', value: '5' },
  ];

  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';

  userAddress2: string = '';
  userLatitude2: string = '';
  userLongitude2: string = '';

  myDatePicker: string;

  checkPhoneForm: FormGroup;
  requestForm1: FormGroup;
  requestForm2: FormGroup;
  loadingBtn: boolean;
  newUser: boolean = false;
  f1: boolean = false;
  f2: boolean = false;
  imgFile: string;
  data: any;
  disabled: boolean;
  upload = 'Upload a file';

  uploadDiv: boolean;
  phoneIsvailable: boolean = true;
  business: boolean;
  next11: boolean;
  imageIcon: boolean = true;
  phoneBtn = true;
  payload: request;
  loading: boolean;
  phoneNum: any;
  phoneCheck: boolean;

  // Getting progress div
  locationdiv: boolean = true;
  delivery_medium: boolean;
  itemDetailsDiv: boolean;
  pickup: boolean;
  sender: boolean;
  summary: boolean;
  checklist: boolean;
  payment: boolean;
  distance:number

  submitted = false;
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private dialogRef: MatDialog,
    private service: GoogleService
  ) {}
  toppings: FormGroup;

  ngOnInit() {
    this.formContros();
    this.toppings = this.fb.group({
      pepperoni: false,
      extracheese: false,
      mushroom: false,
    });
  }

  formContros() {
    this.checkPhoneForm = this.fb.group({
      phone: ['', [Validators.required, Validators.minLength(11)]],
    });

    this.requestForm1 = this.fb.group({
      //Parcel

      itemName: ['', Validators.required],
      pickup: ['', Validators.required],
      medium: ['', Validators.required],
      distance: ['', Validators.required],
      time: ['', Validators.required],

      description: ['', Validators.required],

      quantity: ['', Validators.required],
      category: ['', Validators.required],
      delivery_time: ['', Validators.required],
      image: ['', Validators.required],
      price_estimate: ['', Validators.required],
    });
    this.requestForm2 = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      senderAddress: ['', Validators.required],
      area: ['', Validators.required],

      //Receiver

      rName: ['', Validators.required],
      remail: ['', [Validators.required, Validators.email]],
      rphone: ['', Validators.required],
      rAddress: ['', Validators.required],
      rarea: ['', Validators.required],
    });
  }

  checkRequestedPhoneNumber() {
    this.loadingBtn = true;
  }

  next1() {
    this.delivery_medium = !this.delivery_medium;
    this.locationdiv = !this.locationdiv;
  }

  next2() {
    this.locationdiv = !this.locationdiv;
    this.itemDetailsDiv = !this.itemDetailsDiv;
    console.log('address1', this.userAddress)
    console.log('address2', this.userAddress2)
  }
  summarynav() {
    this.sender = !this.sender;
    this.summary = !this.summary

  }
  checkList() {
    this.checklist = !this.checklist;
    this.summary = !this.summary

  }
  paymentnav() {
    this.checklist = !this.checklist;
    this.payment = !this.payment

  }

  next4() {
    this.locationdiv = false;

    this.itemDetailsDiv = false;
    this.pickup = !this.pickup;
  }
  next5() {
    this.pickup = !this.pickup;
    this.sender = !this.sender;
  }

  checkPhone() {
    console.log('testing...')
    this.loading = true;
   const phone = this.checkPhoneForm.get('phone')?.value;
//    const res:any = this.apiService.checkPhoneNumber(phone)



    if (this.checkPhoneForm.get('phone')?.valid) {
      console.log('testing1...')




      this.apiService.checkPhoneNumber(phone).subscribe((res: any) => {
        console.log('testing2...',res)
 console.log(res)
        if(res.message=='account does not exist'){
          this.phoneCheck = true
          this.phoneNum = phone;
        this.phoneIsvailable = false;
        this.phoneBtn = false;
        this.loading = false;
        }

      });
    } else {
      this.loading = false;
      return;
    }
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imgFile = reader.result as string;
        this.imageIcon = false;
        // this.uploadForm.patchValue({
        //   imgSrc: reader.result
        // });
      };
    }
  }

  handleAddressChange1(address: any) {
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
    console.log(
      '111.........',
      this.userAddress,
      this.userLatitude,
      this.userLongitude
    );
    //  console.log('complete..........',address )
  }

  handleAddressChanges2(address: any) {
    this.userAddress2 = address.formatted_address;
    this.userLatitude2 = address.geometry.location.lat();
    this.userLongitude2 = address.geometry.location.lng();

this.getTravelDistance();
    // if (this.requestForm1.get('pickup')?.valid) {

    //   this.disabled = true;
    // }
  }

  next() {
    // if(this.requestForm1.invalid){
    //  return
    // }
    this.f1 = !this.f1;
    this.f2 = !this.f2;
  }

  submitAddress() {
    console.log('..........11111111111', this.userLatitude);
    console.log('..........22222222222', this.userLatitude2);

    const request = {
      destinations: this.userLatitude2,
      origins: this.userLatitude,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  }

  getTravelDistance() {
    const geocoder = new google.maps.Geocoder();
    const service = new google.maps.DistanceMatrixService();
    const numb1: any = this.userLatitude;
    const numb2: any = this.userLongitude;
    const numb3: any = this.userLatitude2;
    const numb4: any = this.userLongitude2;

    const origin1 = { lat: numb1, lng: numb2 };
    const origin2 = this.userAddress;
    const destinationA = this.userAddress2;
    const destinationB = { lat: numb3, lng: numb4 };
    const request = {
      origins: [origin1, origin2],
      destinations: [destinationA, destinationB],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };
    service.getDistanceMatrix(request).then((response) => {
      this.requestForm1
        .get('distance')
        ?.patchValue(response.rows[1].elements[0].distance.text);
      this.requestForm1
        .get('time')
        ?.patchValue(response.rows[1].elements[0].duration.text);
this.distance = response.rows[1].elements[0].distance.value
console.log('Testing.........', this.distance);

this.apiService.getCost(this.distance).subscribe((res:any)=>{
  console.log('cost.........', res);



})

    });
  }
  testing() {}

  closed() {
    this.dialogRef.closeAll();
  }
}
