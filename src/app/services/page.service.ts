import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment, envMethods } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) { }

  public pageBS = new BehaviorSubject<Object>(1);

  //#region get methods
  getPages() {
    return this.http.get(envMethods.apiUrlCall("pages"));
  }

  getPagesSlug(slug: string) {
    return this.http.get(envMethods.apiUrlCall("pages/" + slug));
  }

  getEditPage(id: any) {
    return this.http.get(envMethods.apiUrlCall("pages/edit/" + id));
  }

  //#endregion

  //#region post pages
  postAddPage(page: any) {
    return this.http.post(envMethods.apiUrlCall("pages/create"), page);
  }

  deletePage(id: any) {
    return this.http.delete(envMethods.apiUrlCall("pages/delete/" + id));
  }
  //#endregion

  //#region put pages
  postEditPage(page: any) {
    return this.http.put(envMethods.apiUrlCall("pages/edit/" + page.pageId), page);
  }
  //#endregion

}
