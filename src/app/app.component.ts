import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  get getFront(){
    if(localStorage.getItem("user")?.toLowerCase()==="\"admin\""){
      return false;
    }
    return true;
  }
}
