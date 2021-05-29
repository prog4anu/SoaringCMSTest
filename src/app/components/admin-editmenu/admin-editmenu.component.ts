import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-admin-editmenu',
  templateUrl: './admin-editmenu.component.html',
  styleUrls: ['./admin-editmenu.component.css']
})
export class AdminEditmenuComponent implements OnInit {

  menus:any;
  successMessage:boolean=false;
  errorMessage:boolean=false;
  
  showMenu:boolean=false;
  showSubMenu:boolean=false;
  pages:any=[];
  param:any;
  MenuId:any;
  userdata:any={
    menuName:"",
    menuPageId:"0"
  };

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private menuService:MenuService,
    private pageService:PageService
  ) { }

  ngOnInit(): void {
    this.menus = this.menuService.menuBS;
    // $('body').addClass("red");

    if(localStorage.getItem("user")!=="\"admin\""){
      this.router.navigateByUrl('');
    }

    this.pageService.getPages().subscribe(pages => {
      // this.pageService.pageBS.next(pages);
      this.pages=pages;
    });

    this.route.params.subscribe((params: any) => {
      this.MenuId = params['menuId'];
      this.menuService.getMenuById(this.MenuId).subscribe((menus:any) => {
        this.menus = menus;
        this.userdata.menuName = menus.menuName;
        this.userdata.menuPageId = menus.menuPageId;
        this.showMenu = menus.showMenu;
        this.showSubMenu = menus.showSubMenu;
      });
    });
  }

  editMenu({form,value,valid}:any){
    form.reset();   
   
    if(valid){
      value.MenuId=parseInt(value.MenuId);
      debugger;
      this.menuService.postEditMenu(value).subscribe((res:any) => {
        if (res == "Menu Already Exists") {
          this.errorMessage = true;
          setTimeout(() => {
            this.errorMessage = false;
          }, 2000);
        }
        else {
          this.successMessage = true;
          setTimeout(() => {
            this.successMessage = false;
          }, 2000);

          this.menuService.getMenus().subscribe(menus => {
            this.menuService.menuBS.next(menus);
          });
        }
      });
    }
    else{
      console.log("form is not valid");
    }
  }
}
