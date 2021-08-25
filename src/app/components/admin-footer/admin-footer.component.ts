import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColorPickerComponent, ColorPickerModule } from 'ngx-color-picker';
import { FooterService } from 'src/app/services/footer.service';

declare var CKEDITOR:any;

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.css']
})

export class AdminFooterComponent implements OnInit {

  content:string="";
  footerId:string="";
  color:string = "#c3c3c3";
  successMessage:boolean=false;

  constructor(
    private router: Router,
    private footerService: FooterService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem("user")!=="\"admin\""){
      this.router.navigateByUrl('');
    } 
    this.footerService.getFooter().subscribe((footer:any)=>{
      if(footer !=null){
        this.footerId=footer['footerId'];
        this.content=footer['content'];
        this.color=footer['bgColor'];
      }
     
      CKEDITOR.fullPage = true;
      //CKEDITOR.allowedContent = true;
      // CKEDITOR.config.extraAllowedContent= '*[id]';
      CKEDITOR.config.allowedContent = true;
      CKEDITOR.config.extraAllowedContent = '*(*)[id]';
      CKEDITOR.replace('Content');
    });
  }

  editSideBar({value}:any){
    value.Content= CKEDITOR.instances.Content.getData();
    this.footerService.putFooter(value).subscribe((sidebar:any)=>{

      this.successMessage=true;
      setTimeout(() => {
        this.successMessage=false;
      }, 2000);
    });
  }

}
