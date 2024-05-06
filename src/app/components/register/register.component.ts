import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,RouterLink,NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  userRegForm !: FormGroup;

  

  ngOnInit():void{
    this.setForm();

  }
  constructor(private _router:Router,private _register:RegisterService){

    
  }

  setForm(){

    this.userRegForm = new FormGroup({
      firstName: new FormControl('',Validators.required),
      lastName: new FormControl('',Validators.required),
      contact: new FormControl('',[Validators.required, Validators.minLength(10)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(5)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(5)]),
    });
  }

  register(){

    console.log(this.userRegForm.value);

    if(this.userRegForm.valid){
      alert("New user registered")
      this._register.registerUser(this.userRegForm.value).subscribe((data)=>{
        console.log(data) })
  
        this.userRegForm.reset();

     // this._router.navigate([''])
    }
    else{
      alert("Please enter valid details")
    }
   
   
     
  }


}
