import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-admin-pages',
  templateUrl: './admin-pages.component.html',
  styleUrls: ['./admin-pages.component.css']
})
export class AdminPagesComponent implements OnInit {

  pages: any;
  successMessage: boolean = false;

  constructor(
    private route: Router,
    private pageService: PageService
  ) { }

  ngOnInit(): void {

    if(localStorage.getItem("user")!=="\"admin\""){
      this.route.navigateByUrl('');
    } 

    this.pages = this.pageService.pageBS;
  }

  // deletePage(pageId:any){

  // }
  deletePage(pageId: any) {
    this.pageService.deletePage(pageId).subscribe((res: any) => {
      this.successMessage = true;
      // setTimeout(() => {
      //   this.successMessage = false;
      // }, 2000);

      this.pageService.getPages().subscribe(pages => {
        this.pageService.pageBS.next(pages);
      });
    });
  }
}
