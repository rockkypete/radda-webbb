import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {

  checkFeatures:string[] =[];
  checkValues:string[] =[];

  itemCheck:string[];

  dialogConfig:MatDialogConfig;

  constructor(
    private dialogRef: MatDialogRef<ChecklistComponent>, @Inject(MAT_DIALOG_DATA) private data:string[]
  ) { }

  ngOnInit(): void {
  }

  //handle check change
  onFeatureChange(e:any){
    if(e.target.value){
      this.checkFeatures.push(e.target.value as string);
    }
  }
  
  //handle check change
  onCheckValueChange(e:any){
    if(e.target.value){
      this.checkValues.push(e.target.value as string);
    }
  }

  addCheck(){
    this.checkFeatures.forEach((feat, index)=>{
      this.itemCheck.push(`${feat}:${this.checkValues[index]}`);
    })
    this.dialogRef.close(this.itemCheck);
  }
  

}
