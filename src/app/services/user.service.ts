import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { envMethods } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  register(user: any) {
    return this.http.post(envMethods.apiUrlCall("api/users/register"), user);
  }

  login(user: any) {
    return this.http.post(envMethods.apiUrlCall("api/users/login"), user);
  }
}
