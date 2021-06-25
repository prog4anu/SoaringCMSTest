import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-submenu-nav',
  templateUrl: './submenu-nav.component.html',
  styleUrls: ['./submenu-nav.component.css']
})
export class SubmenuNavComponent implements OnInit {

  menu:any;
  menuId:number = 0;
  submenus: any = [];
  successMessage: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("user")!=="\"admin\""){
      this.router.navigateByUrl('');
    } 

    this.route.params.subscribe((params: any) => {
      this.menuId = params['menuId'];
      this.menuService.getSubMenus(this.menuId).subscribe(submenus => {
        this.submenus = submenus;
      });
    });
    
  }

  deleteSubMenu(submenuId: any) {
    debugger;
    this.menuService.deleteSubMenu(submenuId).subscribe((res: any) => {
      this.successMessage = true;
      // setTimeout(() => {
      //   this.successMessage = false;
      // }, 2000);

      this.menuService.getSubMenus(this.menuId).subscribe(submenus => {
        this.menuService.menuBS.next(submenus);
      });
    });
  }
}
