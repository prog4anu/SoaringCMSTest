import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Pipe({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  private param: any;
  public pageBody: any;
  public sideBar: string = "";
  public hasSidebar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta,
    private pageService: PageService,
    private sideBarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      console.log(params)
      this.param = params["pages"];
      
      if (this.param === undefined) {
        this.param = "home";
        // this.title.setTitle("Soaring");
      }
      if(this.param !== undefined) {
        //this.title.setTitle(this.param.replace(/-/g, ' ').replace(/\b\w/g, (l: any) => l.toUpperCase()));
        //this.title.setTitle(this.param.replace(/-/g,' ').replace(/\b\w/g, ' '));

        this.pageService.getPagesSlug(this.param).subscribe((page: any) => {
          if (page == "PageNotFound") {
            this.router.navigateByUrl('');
          }

          if((page.metaTitle == "" || page.metaTitle == null) && (page.title != "" || page.title != null)){
            page.metaTitle = page.title.toUpperCase();
          }

          this.title.setTitle(page.metaTitle);
          this.meta.updateTag({ name: 'description', content: page.description });
          this.meta.updateTag({ name: 'keywords', content: page.keywords });

          this.pageBody = page.content;

          if (page["hasSideBar"] === true) {
            this.hasSidebar = true;
            this.sideBarService.getSideBar().subscribe((sidebar: any) => {
              this.sideBar = sidebar["content"];
            });
          }
          else {
            this.hasSidebar = false;
          }
        });
      }
    });
  }
}
