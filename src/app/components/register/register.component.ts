import { Component, OnInit } from '@angular/core';
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
  password:string="";

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
      value.IsAdmin = false;

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

}
