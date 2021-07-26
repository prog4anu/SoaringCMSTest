import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

declare var CKEDITOR:any;
// declare var $:any;

@Component({
  selector: 'app-admin-edit-page',
  templateUrl: './admin-edit-page.component.html',
  styleUrls: ['./admin-edit-page.component.css']
})
export class AdminEditPageComponent implements OnInit {

  page:any;
  title: string = '';
  metaTitle = "";
  description:string = "";
  keywords:string = "";
  content: string = '';
  pageId: string = '';
  successMessage: boolean = false;
  errorMessage: boolean = false;
  hasSidebar: boolean = false;
  sidebar: boolean = false;
  slug: string = '';
  param: any;
  pagelink:string='';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem("user")!=="\"admin\""){
      this.router.navigateByUrl('');
    } 

    this.route.params.subscribe((params: any) => {
      this.param = params['PageId'];
      this.pageService.getEditPage(this.param).subscribe((page: any) => {
        this.page=page;
        this.slug = page['slug'];
        this.hasSidebar = page['hasSideBar'];
        this.title = page['title'];
        this.pageId = page['pageId'];
        this.content = page['content'];
        this.metaTitle = page['metaTitle'];
        this.description = page['description'];
        this.keywords = page['keywords'];
        this.pagelink = page['pageLink'];
        if(page['hasSideBar']===true){
          this.sidebar=true;
        }
        CKEDITOR.fullPage = true;
        CKEDITOR.allowedContent = true;
        
      //   CKEDITOR.replace( 'wysiwyg5', {
      //     allowedContent: {
      //         script: true,
      //         div: true,
      //         $1: {
      //             // This will set the default set of elements
      //             elements: CKEDITOR.dtd,
      //             attributes: true,
      //             styles: true,
      //             classes: true
      //         }
      //     }
      // } );
        CKEDITOR.replace('Content');
      });
    });

    
  }

  editPage({ value, valid }: any) {
    if (valid) {
      value.Content= CKEDITOR.instances.Content.getData();
      this.pageService.postEditPage(value).subscribe((res: any) => {
        if (res == "Page Already Exists") {
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

          this.pageService.getPages().subscribe(pages => {
            this.pageService.pageBS.next(pages);
          });
        }
      });
    }
    else {
      console.log("form is not valid");
    }
  }

}
