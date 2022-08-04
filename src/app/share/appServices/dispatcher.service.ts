import { Injectable } from '@angular/core';
import { ImageData, Location } from '../model';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DispatcherService {
  

  trigger = ''

  items = [
    {
    title: '',
    quantity: 0,
    imageUrl: '',
    imageId:  '',
    locations: [
      {
        senderPhone: '',
        receiverPhone: '',
        pickupAddress: '',
        pickupLatitude: 0,
        pickupLongitude: 0,
        deliveryAddress: '',
        deliveryLatitude: 0,
        deliveryLongitude: 0
      }
    ],
    shipping: 0,
    checkList: ''
    }
  ]
  constructor() { }

  getTrigger = ()=>{
    return this.trigger
  }

  setTrigger = (trigger:string)=>{
    this.trigger = trigger
  }

  getItems = ()=>{
    return this.items
  }
  setField = (field:string, value:string|number| ImageData, index:number)=>{
    switch (field){
      case 'title':
        this.items[index].title = value as string
      break;
      case 'quantity':
        this.items[index].quantity = value as number
      break;
      case 'image':
        this.items[index].imageId = (value as ImageData).imageId
        this.items[index].imageUrl = (value as ImageData).imageUrl
      break;
      case 'senderPhone':
        this.items[index].locations[index].senderPhone = value as string
      break;
      case 'receiverPhone':
        this.items[index].locations[index].receiverPhone = value as string
      break;
      case 'checklist':
        this.items[index].checkList = value as string
      break;

    }
  }


  updatePickup = (address:string, latitude:number, longitude:number)=>{
    this.items[0].locations[0].pickupAddress = address
    this.items[0].locations[0].pickupLatitude = latitude
    this.items[0].locations[0].pickupLongitude = longitude
  }

  updateDelivery = (address:string, latitude:number, longitude:number)=>{
    this.items[0].locations[0].deliveryAddress = address
    this.items[0].locations[0].deliveryLatitude = latitude
    this.items[0].locations[0].deliveryLongitude = longitude
  }

  pushPickup = (address:string, latitude:number, longitude:number)=>{
    let lastIndex = this.items.length -1
    this.items[lastIndex].locations[lastIndex].pickupAddress = address
    this.items[lastIndex].locations[lastIndex].pickupLatitude = latitude
    this.items[lastIndex].locations[lastIndex].pickupLongitude = longitude
  }
  pushDelivery= (address:string, latitude:number, longitude:number)=>{
    let lastIndex = this.items.length -1
    this.items[lastIndex].locations[lastIndex].deliveryAddress = address
    this.items[lastIndex].locations[lastIndex].deliveryLatitude = latitude
    this.items[lastIndex].locations[lastIndex].deliveryLongitude = longitude
  }


  computeTotalShipping = ()=>{
    let sum = this.items.map((item)=>item.shipping).reduce((total, start)=>total + start)
    return sum
  }





}


