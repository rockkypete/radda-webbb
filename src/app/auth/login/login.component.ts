import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/share/appServices/api.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  loadingBtn: boolean
  dialogConfig: MatDialogConfig;

  constructor(private apiService: ApiService,
    private fb: FormBuilder, private dialogRef: MatDialog,
    private router:Router
  ){}


  ngOnInit(): void {
    this.loadingBtn = false;
    this.loginForm = this.fb.group({
      phone: ['', Validators.required],
      password:['', Validators.required]
    })
  }

  
  
  login(){
    let newUser = {
      phone: this.loginForm.get('phone')!.value,
      password: this.loginForm.get('password')!.value
    }
    this.apiService.login(newUser).subscribe((res:any)=>{
      if(res.success === false){
        window.alert('invalid credentials provided...')
        console.log('login failed... ', res)
      }else{
        localStorage.setItem('user', JSON.stringify(res.authUser))
      }
    })    
    this.router.navigate(['/dashboard']) ;
  }

  signUP(){
    this.router.navigate(['/register']);
  }

  routeHome(){
    this.router.navigate([''])
  }
}
