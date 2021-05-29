import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-admin-addsubmenu',
  templateUrl: './admin-addsubmenu.component.html',
  styleUrls: ['./admin-addsubmenu.component.css']
})
export class AdminAddsubmenuComponent implements OnInit {

  submenus:any;
  successMessage:boolean=false;
  errorMessage:boolean=false;
  SubMenuName:string = "";
  ParentMenuId : number = 0;
  SubMenuPageId: number = 0;
  showSubMenu:boolean=false;
  pages:any=[];
  param: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private submenuService:MenuService, 
    private pageService:PageService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("user")!=="\"admin\""){
      this.router.navigateByUrl('');
    } 

    this.pageService.getPages().subscribe(pages => {
      this.pages=pages;
    });

    this.route.params.subscribe((params: any) => {
      this.ParentMenuId = params['menuId'];
      this.param = params['menuId'];
    });

  }

  addSubMenu({form,value,valid}:any){
    form.reset(); 
    debugger;
    if(valid){
      value.ParentMenuId = parseInt(value.ParentMenuId);
      this.submenuService.postAddSubMenu(value).subscribe((res:any) => {
        if(res=="Sub Menu Already Exists for this Menu"){
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

          this.submenuService.getSubMenus(this.param).subscribe(menus => {
            this.submenuService.menuBS.next(menus);
          });
        }
      });
    }
    else{
      console.log("form is not valid");
    }
  }

}
