import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment,envMethods } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(
    private http:HttpClient
  ) { }


  getSideBar(){
    return this.http.get(envMethods.apiUrlCall("api/sidebar"));
  }

  putSideBar(page:any){
    return this.http.put(envMethods.apiUrlCall("api/sidebar/edit"),page);  
  }
}
