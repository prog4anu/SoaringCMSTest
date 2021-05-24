import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  pages: any;
  user: any;

  get userLoggedIn() {

    if (localStorage.getItem("user")) {
      this.user=localStorage.getItem("user")?.replace(/\"/g,"");
      return true;
    }
    return false;
  }

  constructor(
    public pageService: PageService
  ) { }

  ngOnInit(): void {
    this.pageService.getPages().subscribe(pages => {
      this.pageService.pageBS.next(pages);
      this.pages = this.pageService.pageBS;
    });
  }

}
