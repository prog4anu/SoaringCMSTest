import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';

declare var CKEDITOR:any;

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  content:string="";
  SideBarId:string="";
  successMessage:boolean=false;

  constructor(
    private router: Router,
    private sideBarService: SidebarService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("user")!=="\"admin\""){
      this.router.navigateByUrl('');
    } 

    this.sideBarService.getSideBar().subscribe((sidebar:any)=>{
      this.SideBarId=sidebar['sideBarId'];
      this.content=sidebar['content'];
      CKEDITOR.replace('Content');
    });
  }

  editSideBar({value}:any){
    value.Content= CKEDITOR.instances.Content.getData();
    this.sideBarService.putSideBar(value).subscribe((sidebar:any)=>{

      this.successMessage=true;
      setTimeout(() => {
        this.successMessage=false;
      }, 2000);
    });
  }
}
