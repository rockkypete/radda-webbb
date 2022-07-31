import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/share/appServices/api.service';
import { GoogleService } from 'src/app/share/appServices/google.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loadingBtn: boolean

  constructor(private apiService: ApiService, private fb: FormBuilder, private dialogRef: MatDialog, private service: GoogleService){}


  ngOnInit(): void {
  }







  closed(){
    this.dialogRef.closeAll()
  }
}
