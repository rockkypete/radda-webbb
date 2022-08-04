
export interface ItemLocation {
  locationId?:number;
  itemId?:number;
  senderPhone?: string
  pickupAddress?: string
  pickupLatitude?: number
  pickupLongitude?: number
  receiverPhone?: string
  deliveryAddress?: string
  deliveryLatitude?: number
  deliveryLongitude?: number
}

export interface Item {
  itemId?: number;
  deliveryId?: number;
  description?: string; 
  title?: string;
  imageUrl?: string;
  imageId?: string;
  locations?:ItemLocation[];
  quantity?: number; 
  shipping?: number;
  deliveryCode?: string;
  dispatchStatus?: string;
  checkList?: string;
}

export interface LoginData {
  phone: string;
  password: string
}

export interface RegisterData {
  userName:string;
  email: string;
  phone:string;
  password:string;
  password2:string;
  businessName?:string;
  businessLocation?: string
}

export interface RegisterResponse  {
  success: boolean;
  tokenId:string
  message?: string
}

export interface LoginResponse  {
  success:boolean;
  authUser:{
    userName:string,
    email:string,
    phone:string,
    role:string,
    message?: string
  }
}
export interface GenericResponse {
  success:boolean;
  message: string
}

export interface CheckUserResponse {
  success:boolean;
  firstAccess?: boolean;
  message?: string
}

export interface OnBoardResponse  {
  success:boolean;
  passcode?: string;
  message?: string
}

export interface DeliveryResponse  {
  success:boolean;
  trackingId?: string
  message?: string
}


export interface ShippingFare  {
  success:boolean
  cost:number
}

export interface TransactionResponse  {
  success:boolean;
  transactions: Transaction[];
  message: string
}

export interface BalanceResponse  {
  success:boolean;
  userBalance: number
}
export interface Delievry {
  owner?: number;
  deliveryId?: number;
  partner?: number;
  rider?: number;
  status?: string;
  isAvailable?: boolean;      
  trackingId?: string;    
  items?: Item[],
  totalShippment?:number;
  paymentMode?:string;
  serviceClass?:string
}

export interface Transaction {
  transactionId?:number,
  reference: string,
  walletId?: number
  transactionType: string,
  amount: number,
  time?: any
}

export interface UserData {
  userDeliveries: Delievry[];
  partnerDeliveries: Delievry[];
  transactions: Transaction[];
  items: Item[];
}

export interface User {
  userId?: number;
  userName?: string;
  email?:string;
  role?:string;
  password?: string;
  phone?: string;
  riderCode?: string;
  firstAccess?:boolean;
  businessLocation?: string;
  businessName?: string;
  walletId?: number;
  whosRider?: number;
  subscriptionToken?:string
}

export interface ImageData{
  imageUrl:string;
  imageId:string
}

export interface Location {
  lat: number,
  lng: number
}