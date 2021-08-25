import { Pipe, PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FooterService } from 'src/app/services/footer.service';

@Pipe({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value:any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})

export class FooterComponent implements OnInit {

  content: string = "";
  footerId: string = "";
  color:string = "";

  

  constructor(
    private route: Router,
    private footerService: FooterService
  ) { }

  ngOnInit(): void {
    this.footerService.getFooter().subscribe((footer:any)=>{
      if(footer !=null){
        this.footerId=footer['footerId'];
        this.content=footer['content'];
        this.color=footer['bgColor'];
        console.log(this.content);
      }
    });

  }

}

