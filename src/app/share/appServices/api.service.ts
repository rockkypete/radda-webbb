import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //baseURL :string = 'https://www.raddaapi.com/';
  baseURL :string = 'http://localhost:4000/';

  
  


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
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.post(this.baseURL+`v1/auth_service/login`, payload, {headers:authHeader})
  }

  //create delivery request
  request(payload:any){
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.post(this.baseURL+`v1/delivery_service/new_delivery`, payload, {headers:authHeader})
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
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.get(this.baseURL+`v1/payment_service/balance`, {headers:authHeader})
  }

  //charge user and create delivey
  checkout(payload:any){        
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.post(this.baseURL+`v1/delivery_service/new_delivery`, payload, {headers:authHeader} )
  }

  //rider onboarding by partner
  onboardRider(payload:{name:string, phone:string}){
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.post(this.baseURL+`v1/auth_service/onboarding`, payload, {headers:authHeader})
  }

  //bank account update
  addBankAccount(payload:any){
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.post(this.baseURL+`v1/payment_service/bank`, payload, {headers:authHeader})
  }

  //dashboard data aggregation
  aggregateData(){
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.get(this.baseURL+`v1/auth_service/data`, {headers:authHeader})
  }
  //add funds to wallet
  fundWallet(payload:{amount:string, email:string}){
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.post(this.baseURL+`v1/pay`, payload, {headers:authHeader})
  }

  //track delivery
  trackDelivery(payload:string){
    let authHeader:HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `${JSON.parse(localStorage.getItem('user')!).tokenId}`
    })
    return this.http.post(this.baseURL+`v1/delivery_service/tracking`, payload, {headers:authHeader})
  }
}
