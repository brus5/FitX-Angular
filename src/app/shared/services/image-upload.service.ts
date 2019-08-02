import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private UPLOAD_FILE = 'https://us-central1-fitx-beba9.cloudfunctions.net/uploadFile';

  private selectedFile: File = null;

  constructor(private http: HttpClient) {}

  public selectFile(file) {
    this.selectedFile = file;
  }

  public uploadImage$(): Observable<any> {
    return this.http.post(this.UPLOAD_FILE, this.formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  private get formData(): FormData {
    let fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    return fd;
  }
}
