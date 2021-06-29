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
    return this.http.get(envMethods.apiUrlCall("menu"));
  }

  getMenuById(id: any){
    return this.http.get(envMethods.apiUrlCall("menu/getmenubyid/" + id));
  }

  getSubMenus(id: any) {
    return this.http.get(envMethods.apiUrlCall("menu/" + id));
  }

  getSubMenuById(id: any){
    return this.http.get(envMethods.apiUrlCall("menu/getsubmenubyid/" + id));
  }
  //#endregion

  //#region post pages
  postAddMenu(menu: any) {
    return this.http.post(envMethods.apiUrlCall("menu/createmenu"), menu);
  }

  postAddSubMenu(submenu: any) {
    return this.http.post(envMethods.apiUrlCall("menu/createsubmenu"), submenu);
  }

  deleteMenu(id: any) {
    return this.http.delete(envMethods.apiUrlCall("menu/deletemenu/" + id));
  }

  deleteSubMenu(id: any) {
    return this.http.delete(envMethods.apiUrlCall("menu/deletesubmenu/" + id));
  }
  //#endregion

  //#region put pages
  postEditMenu(menu: any) {
    return this.http.put(envMethods.apiUrlCall("menu/edit"), menu);
  }

  postEditSubMenu(submenu: any) {
    return this.http.put(envMethods.apiUrlCall("menu/editsubmenu"), submenu);
  }
  //#endregion
}


