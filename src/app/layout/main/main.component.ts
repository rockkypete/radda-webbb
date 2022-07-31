import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { RequestFormComponent } from 'src/app/core/request-form/request-form.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  dialogConfig: MatDialogConfig;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(){

    this.dialogConfig = new MatDialogConfig();

    // this.dialogConfig.position = { top: '0', right: '0' };
     this.dialogConfig.minHeight = '100vh';
     this.dialogConfig.minWidth = '100vw';
    // this.dialogConfig.maxHeight = '40vh';
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = false;

    this.dialog.open(
      RequestFormComponent,
      this.dialogConfig
    );

  // this.dialog.open(RequestFormComponent,{
  //   width: '250px',
  //   height: '400px'
  // })
}

}
