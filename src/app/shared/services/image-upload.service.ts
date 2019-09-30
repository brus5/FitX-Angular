import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  private selectedFile: File = null;

  constructor(private http: HttpClient) {}

  public selectFile(file) {
    this.selectedFile = file;
  }

  public uploadImage$(link: string): Observable<any> {
    return this.http.post(link, this.formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  private get formData(): FormData {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    return fd;
  }
}
