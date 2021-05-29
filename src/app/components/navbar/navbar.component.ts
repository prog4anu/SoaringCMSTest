import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pages: any;
  menus: any;
  user: any;
  submenus: any = [];

  get userLoggedIn() {

    if (localStorage.getItem("user")) {
      this.user = localStorage.getItem("user")?.replace(/\"/g, "");
      return true;
    }
    return false;
  }

  constructor(
    public pageService: PageService,
    public menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.pageService.getPages().subscribe(pages => {
      this.pageService.pageBS.next(pages);
      this.pages = this.pageService.pageBS;
    });

    this.menuService.getMenus().subscribe((menu: any) => {
      this.menuService.menuBS.next(menu);
      this.menus = this.menuService.menuBS;

      if (menu.length > 0) {
        menu.forEach((submenu: any) => {
          this.menuService.getSubMenus(submenu.menuId).subscribe((submenus: any) => {
           
            if (submenus.length > 0) {
              this.submenus.push(submenus);
              
            }
          });

          
        }
        );
        
      }
    });
  }

}
