import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/share/appServices/api.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  loading: boolean
  dialogConfig: MatDialogConfig;

  constructor(private apiService: ApiService,
    private fb: FormBuilder, private dialogRef: MatDialog,
    private router:Router
  ){}


  ngOnInit(): void {
    this.loading = false;
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password2:['', Validators.required],
      businessName: ['', Validators.required],
      businessLocation: ['', Validators.required],
    })
  }


  logIn(){
    this.router.navigate(['/login']);

  }

  registerUser(){
    this.loading = true;
    let newUser = {
      userName: this.registerForm.get('userName')!.value,
      email: this.registerForm.get('email')!.value,
      phone: this.registerForm.get('phone')!.value,
      password: this.registerForm.get('password')!.value,
      password2: this.registerForm.get('password2')!.value,
      businessName: this.registerForm.get('businessName')!.value,
      businessLocation: this.registerForm.get('businessLocation')!.value,
    }    
    
    this.apiService.register(newUser).subscribe((res:any)=>{
      if(res.success === false){
        //alert registration error
        window.alert('invalid credentials provided...')
      }else{
        localStorage.setItem('user', JSON.stringify(res.registeredUser))
        this.router.navigate(['login'])
      }
    })
    this.loading = false;
  }

  routeHome(){
    this.router.navigate([''])
  }
}
