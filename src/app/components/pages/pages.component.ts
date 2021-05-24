import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';
import { SidebarService } from 'src/app/services/sidebar.service';

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
    private pageService: PageService,
    private sideBarService: SidebarService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.param = params["pages"];
      if (this.param === undefined) {
        this.param = "home";
        this.title.setTitle("Soaring");
      }
      else {
        this.title.setTitle(this.param.replace(/-/g, ' ').replace(/\b\w/g, (l: any) => l.toUpperCase()));
        //this.title.setTitle(this.param.replace(/-/g,' ').replace(/\b\w/g, ' '));

        this.pageService.getPagesSlug(this.param).subscribe((page: any) => {
          if (page == "PageNotFound") {
            this.router.navigateByUrl('');
          }

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
