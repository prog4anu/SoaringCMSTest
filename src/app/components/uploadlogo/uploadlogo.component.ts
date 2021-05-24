import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageService } from 'src/app/services/page.service';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-uploadlogo',
  templateUrl: './uploadlogo.component.html',
  styleUrls: ['./uploadlogo.component.css']
})
export class UploadlogoComponent implements OnInit {

  selectedFile: ImageSnippet | any;

  constructor(private pageService: PageService){}

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.pageService.uploadImage(this.selectedFile.file).subscribe((res:any) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
  }

}
