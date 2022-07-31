export class register  {
  "userName":string
  "email": string
  "phone":string
  "password":string
  "role":string
  "businessName":string
}


export class request  {

  "user":number
  "description": string
  "title":string
  "merchantName":string
  "merchantPhone":string
  "pickupAddress":string
  "deliveryAddress":string
  "quantity": number
  "deliveryTime": string
  "deliveryDate": string
  "deliveryCost":number
}

export class login  {
  "phone":string
  "password":string

}

export type item = { 
  itemId?: number;
    deliveryId?: number;
    description?: string; 
    title?: string;
    imageUrl?: string;
    imageId?: string;
    locations?:itemLocation[];
    quantity?: number; 
    shipping?: number;
    deliveryCode?: string;
    dispatchStatus?: string;
    checkList?: string;
}

export type itemLocation = {
  locationId?:number;
  locationType?:string;
  itemId?:number;
  senderName?: string
  senderPhone?: string
  pickupAddress?: string
  pickupLatitude?: number
  pickupLongitude?: number
  receiverName?: string
  receiverPhone?: string
  deliveryAddress?: string
  deliveryLatitude?: number
  deliveryLongitude?: number
}

export type user ={
  tokenId:string;
  userName:string;
  password:string;
  role:string;
}