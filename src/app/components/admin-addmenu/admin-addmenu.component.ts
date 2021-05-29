import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-admin-addmenu',
  templateUrl: './admin-addmenu.component.html',
  styleUrls: ['./admin-addmenu.component.css']
})
export class AdminAddmenuComponent implements OnInit {

  menus:any;
  successMessage:boolean=false;
  errorMessage:boolean=false;
  MenuName:string = "";
  MenuPageId: number = 0;
  showMenu:boolean=false;
  showSubMenu:boolean=false;
  pages:any=[];

  constructor(
    private router:Router,
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
  }

  addMenu({form,value,valid}:any){
    form.reset();   
    debugger;
    if(valid){
      this.menuService.postAddMenu(value).subscribe((res:any) => {
        if(res=="Menu Already Exists"){
          this.errorMessage=true;
          setTimeout(() => {
            this.errorMessage=false;
          }, 2000);
        }
        else{
          this.successMessage=true;

          setTimeout(() => {
            this.successMessage=false;
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
