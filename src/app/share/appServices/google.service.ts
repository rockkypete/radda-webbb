import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  googleURL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDkjPwwHfw0xRhVfX6czoIeRoZgmLeqDIw&libraries=places&callback=getPredictions'
  constructor(private http: HttpClient) { }

  getRespond(){
    return this.http.get(this.googleURL)
  }
}
