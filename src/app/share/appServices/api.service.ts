import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseURL :string = 'https://www.raddaapi.com/';
  baseURL :string = 'http://localhost:4000/';

  authHeader:HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
  })
  


  constructor(private http: HttpClient) { }

  //validate user account
  checkPhoneNumber(payload:string){
    return this.http.post(this.baseURL+`v1/auth_service/validateUser`,payload)
  }

  //register new user
  register(payload:any){
    return this.http.post(this.baseURL+`v1/auth_service/register`,payload)
  }

  //user login
  login(payload:{phone:string, password:string}){
    return this.http.post(this.baseURL+`v1/auth_service/login`, payload, {headers:this.authHeader})
  }

  //create delivery request
  request(payload:any){
    return this.http.post(this.baseURL+`v1/delivery_service/new_delivery`, payload, {headers:this.authHeader})
  }

  //compute shipping cost
  getCost(payload:number){
    return this.http.get(this.baseURL+`v1/delivery_service/shipping-fee/${payload}`)
  }

  //get image url from cloud storage
  getImageLink(payload:any){
    return this.http.post(this.baseURL+`v1/delivery_service/image-upload`, payload)
  }

  //get user wallet balance
  getBalance(){
    return this.http.get(this.baseURL+`v1/payment_service/balance`, {headers:this.authHeader})
  }

  //charge user and create delivey
  checkout(payload:any){        
    return this.http.post(this.baseURL+`v1/delivery_service/new_delivery`, payload, {headers:this.authHeader} )
  }

  //rider onboarding by partner
  onboardRider(payload:{name:string, phone:string}){
    return this.http.post(this.baseURL+`v1/auth_service/onboarding`, payload, {headers:this.authHeader})
  }

  //bank account update
  addBankAccount(payload:any){
    return this.http.post(this.baseURL+`v1/payment_service/bank`, payload, {headers:this.authHeader})
  }

  //dashboard data aggregation
  aggregateData(){
    return this.http.get(this.baseURL+`v1/auth_service/data`, {headers:this.authHeader})
  }
  //add funds to wallet
  fundWallet(payload:{amount:string, email:string}){
    return this.http.post(this.baseURL+`v1/pay`, payload, {headers:this.authHeader})
  }

  //track delivery
  trackDelivery(payload:string){
    return this.http.post(this.baseURL+`v1/delivery_service/tracking`, payload, {headers:this.authHeader})
  }
}
