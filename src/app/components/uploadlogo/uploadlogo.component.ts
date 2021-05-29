import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UploadimagesService } from 'src/app/services/uploadimages.service';
import { envMethods } from 'src/environments/environment';

@Component({
  selector: 'app-uploadlogo',
  templateUrl: './uploadlogo.component.html',
  styleUrls: ['./uploadlogo.component.css']
})

export class UploadlogoComponent implements OnInit {
  progress: any | "";
  public message: string | undefined;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(
    private http: HttpClient,
    private uploadimagesService: UploadimagesService
    ) { }

  ngOnInit(): void {
  }
  
  public uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    // this.uploadimagesService.uploadImage(formData)
    //   .subscribe((event: any) => {
    //     if (event.type === HttpEventType.UploadProgress)
    //       this.progress = Math.round(100 * event.loaded / event.total);
    //     else if (event.type === HttpEventType.Response) {
    //       this.message = 'Upload success.';
    //       this.onUploadFinished.emit(event.body);
    //     }
    //   });

    this.http.post(envMethods.apiUrlCall("api/upload/uploadlogo"), formData, {reportProgress: true, observe: 'events'})
    .subscribe((event:any) => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.message = 'Upload success.';
        this.onUploadFinished.emit(event.body);
      }
    });
  }

}
