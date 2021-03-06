import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

declare var CKEDITOR:any;

declare var CKFinder:any;
// declare var $:any;

@Component({
  selector: 'app-admin-add-page',
  templateUrl: './admin-add-page.component.html',
  styleUrls: ['./admin-add-page.component.css']
})

export class AdminAddPageComponent implements OnInit {

  pages:any;
  successMessage:boolean=false;
  errorMessage:boolean=false;
  hasSidebar:boolean=false;
  title:string = "";
  metaTitle = "";
  description:string = "";
  keywords:string = "";
  content:string = "";
  pagelink:string = "";

  constructor(
    private router:Router,
    private pageService:PageService
  ) { }

  ngOnInit(): void {
    this.pages = this.pageService.pageBS;
    // $('body').addClass("red");

    if(localStorage.getItem("user")!=="\"admin\""){
      this.router.navigateByUrl('');
    } else{
      CKEDITOR.replace('Content');
      var editor =CKEDITOR.replace('Content');

      CKFinder.setupCKEditor(editor);
    }

    
  }

  addPage({form,value,valid}:any){
    form.reset();    
    if(valid){
      value.content= CKEDITOR.instances.Content.getData();
      this.pageService.postAddPage(value).subscribe((res:any) => {
        if(res=="Page Already Exists"){
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

          CKEDITOR.instances.Content.setData('');

          this.pageService.getPages().subscribe(pages => {
            this.pageService.pageBS.next(pages);
          });

          
        }
      });
    }
    else{
      console.log("form is not valid");
    }
  }

}
