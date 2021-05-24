import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFailed: boolean = false;
  userRegistered: boolean = false;
  username:string="";
  password:string="";

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (localStorage.getItem("user")) {
      this.router.navigateByUrl("");
    }
    
    if (localStorage.getItem("userReegisted")) {
      this.userRegistered = true;
      localStorage.removeItem("userReegisted");
    }
  }

  login({value,valid}:any){
    if(valid){
      value.IsAdmin = false;

      this.userService.login(value).subscribe((res:any) =>{
        if(res=="InvalidUser"){
          this.loginFailed=true;
          setTimeout(() => {
            this.loginFailed=false;
          }, 2000);
        }
        else{
          localStorage.setItem("user",JSON.stringify(res));
          if(localStorage.getItem("user")?.toLowerCase() === "\"admin\""){
            this.router.navigateByUrl('admin/pages');
          }
          else{
            this.router.navigateByUrl('');
          }
        }
      });
    }
    else{
      console.log("form is not valid");
    }
  }

}
