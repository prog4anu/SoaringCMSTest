import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { envMethods } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  public menuBS = new BehaviorSubject<Object>(1);

  //#region get methods
  getMenus() {
    return this.http.get(envMethods.apiUrlCall("api/menu"));
  }

  getMenuById(id: any){
    return this.http.get(envMethods.apiUrlCall("api/menu/getmenubyid/" + id));
  }

  getSubMenus(id: any) {
    return this.http.get(envMethods.apiUrlCall("api/menu/" + id));
  }

  getSubMenuById(id: any){
    return this.http.get(envMethods.apiUrlCall("api/menu/getsubmenubyid/" + id));
  }
  //#endregion

  //#region post pages
  postAddMenu(menu: any) {
    return this.http.post(envMethods.apiUrlCall("api/menu/createmenu"), menu);
  }

  postAddSubMenu(submenu: any) {
    return this.http.post(envMethods.apiUrlCall("api/menu/createsubmenu"), submenu);
  }

  deleteMenu(id: any) {
    return this.http.delete(envMethods.apiUrlCall("api/menu/deletemenu/" + id));
  }

  deleteSubMenu(id: any) {
    return this.http.delete(envMethods.apiUrlCall("api/menu/deletesubmenu/" + id));
  }
  //#endregion

  //#region put pages
  postEditMenu(menu: any) {
    return this.http.put(envMethods.apiUrlCall("api/menu/edit"), menu);
  }

  postEditSubMenu(submenu: any) {
    return this.http.put(envMethods.apiUrlCall("api/menu/editsubmenu"), submenu);
  }
  //#endregion
}


