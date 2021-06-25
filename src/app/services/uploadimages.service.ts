import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { envMethods } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadimagesService {

  constructor(private http: HttpClient) { }

  public uploadBS = new BehaviorSubject<Object>(1);

  //#region get methods
  //#endregion

  //#region post pages
  uploadImage(formData: any) {
    return this.http.post(envMethods.apiUrlCall("api/upload/uploadlogo"), formData, { reportProgress: true, observe: 'events' });
  }
  //#endregion

  //#region put pages
  //#endregion
}
