import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userExists:boolean=false;
  errorMessage:boolean=false;
  successMessage:boolean=false;
  username:string="";
  confirmpassword:string="";
  firstname:string="";
  lastname:string="";
  
  Admin: string ="";
  isAdmin: number = 0;
  userdata:any={
    password:"",
    confirmpassword:"",
    phonenumber:""
  };

  constructor(
    private router:Router,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.router.navigateByUrl("");
    }
  }

  register({value,valid}:any){
    if(valid){
      if(this.Admin!="" && this.Admin=="yes"){
        value.IsAdmin = 1;
      }
      else{
        value.IsAdmin = 0;
      }
      

      this.userService.register(value).subscribe((res:any) =>{
        if(res=="User Already Exists"){
          this.userExists=true;
          setTimeout(() => {
            this.userExists=false;
          }, 2000);
        }
        else{
          localStorage.setItem("userRegistered","true");
          this.router.navigateByUrl('login');
        }
      });
    }
    else{
      console.log("form is not valid");
    }
  }

  password = new FormControl("", [
    Validators.required,
    Validators.pattern(
      "^((?=\\S*?[A-Z])(?=\\S*?[a-z])(?=\\S*?[0-9]).{8,255})\\S$"
    )
  ]);
  confirmPassword = new FormControl("", [
    Validators.required,
    this.confirmEquals() 
  ]); 

  confirmEquals(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null =>  
        control.value?.toLowerCase() === this.passwordValue.toLowerCase() 
            ? null : {noMatch: true};
  }

  get passwordValue() {
    return this.password.value;
  }
}
