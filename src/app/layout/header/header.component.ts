import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dialogConfig: MatDialogConfig;

  constructor(private dialog: MatDialog,private router:Router) { }

  ngOnInit(): void {
  }

  openDialog(){

    // this.dialogConfig = new MatDialogConfig();

    // // this.dialogConfig.position = { top: '0', right: '0' };
    //  this.dialogConfig.minHeight = '100vh';
    //  this.dialogConfig.minWidth = '100vw';
    // // this.dialogConfig.maxHeight = '40vh';
    // this.dialogConfig.disableClose = true;
    // this.dialogConfig.autoFocus = false;

    // this.dialog.open(
    //   LoginComponent,
    //   this.dialogConfig
    // );
      this.router.navigate(['/login'])
  // this.dialog.open(RequestFormComponent,{
  //   width: '250px',
  //   height: '400px'
  // })
}

test(){
  this.router.navigate(['/dashboard']);
}

}
