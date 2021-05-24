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
  content: string = '';
  pageId: string = '';
  successMessage: boolean = false;
  errorMessage: boolean = false;
  hasSidebar: boolean = false;
  sidebar: boolean = false;
  slug: string = '';
  param: any;

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
        console.log(page['hasSideBar']);
        this.page=page;
        this.slug = page['slug'];
        this.hasSidebar = page['hasSideBar'];
        this.title = page['title'];
        this.pageId = page['pageId'];
        this.content = page['content'];
        if(page['hasSideBar']===true){
          this.sidebar=true;
        }
        CKEDITOR.replace('Content');
      });
    });

    
  }

  editPage({ value, valid }: any) {
    if (valid) {
      value.Content= CKEDITOR.instances.Content.getData();
      this.pageService.postEditPage(value).subscribe((res: any) => {
        console.log(res);

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
