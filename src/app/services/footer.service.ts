import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envMethods } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(
    private http:HttpClient
  ) { }

  getFooter(){
    return this.http.get(envMethods.apiUrlCall("footer"));
  }

  putFooter(page:any){
    return this.http.put(envMethods.apiUrlCall("footer/edit"),page);  
  }
}
