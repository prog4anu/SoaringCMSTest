import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menus-nav',
  templateUrl: './menus-nav.component.html',
  styleUrls: ['./menus-nav.component.css']
})
export class MenusNavComponent implements OnInit {

  menus: any;
  successMessage: boolean = false;

  constructor(
    private route: Router,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem("user")!=="\"admin\""){
      this.route.navigateByUrl('');
    } 

    // this.menus = this.menuService.menuBS;

    this.menuService.getMenus().subscribe(menus => {
      this.menus=menus;
      this.menuService.menuBS.next(menus);
    });
  }

  // deletePage(pageId:any){

  // }
  deleteMenu(menuId: any) {
    this.menuService.deleteMenu(menuId).subscribe((res: any) => {
      this.successMessage = true;
      // setTimeout(() => {
      //   this.successMessage = false;
      // }, 2000);

      this.menuService.getMenus().subscribe(menus => {
        this.menuService.menuBS.next(menus);
      });
    });
  }

}
