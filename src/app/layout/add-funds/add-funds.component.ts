import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/share/appServices/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-funds',
  templateUrl: './add-funds.component.html',
  styleUrls: ['./add-funds.component.css']
})
export class AddFundsComponent implements OnInit {
  loadingBtn:boolean
  addFundsForm:FormGroup

  @Input() role:string
  
  @Output() view = new EventEmitter<string>();

  constructor(
    private fb:FormBuilder, private apiService:ApiService, private router:Router
  ) { }


  ngOnInit(): void {

    this.addFundsForm = this.fb.group({
      amount: ['', Validators.required ]
    })
  }

  fundWallet(){
    let payload = {
      amount: this.addFundsForm.get('amount')!.value,
      email: JSON.parse(localStorage.getItem('user')!).email
    } 
    this.apiService.fundWallet(payload).subscribe((res:any)=>{
      this.router.navigate([`${res.authstring}`]);
    })
  }

}
