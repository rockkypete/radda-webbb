import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RequestFormComponent } from 'src/app/core/request-form/request-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  dialogConfig= new MatDialogConfig();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getStarted(){

    this.dialogConfig.width = '60vw';
    this.dialogConfig.height = '30vh';


    this.dialog.open(
      RequestFormComponent, this.dialogConfig
    )
  }
}
