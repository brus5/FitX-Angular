import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NewsService} from '../../services/news.service';
import {News} from '../../../shared/models/news';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ImageUploadService} from '../../../shared/services/image-upload.service';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit, OnDestroy {

  @Input('newsId') newsId: string;

  news = {
    bigHeader: false,
    images: []
  } as News;
  uploadProgress$;

  private newsSubscription: Subscription = new Subscription();
  private UPLOAD_LINK = 'https://us-central1-fitx-beba9.cloudfunctions.net/newsImage';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _newsService: NewsService,
              private _toastrService: ToastrService,
              private _uploadImageService: ImageUploadService) { }

  ngOnInit() {
    this.newsId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.newsId)
      this.newsSubscription = this._newsService.getNews(this.newsId)
        .subscribe(item => this.news = item);
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

  onSave() {
    if (this.newsId)
      this._newsService.update(this.news)
        .then(() => this._toastrService.success(this.Component.UPDATED));
    else
      this.createNews();
  }

  deleteNews() {
    if (!confirm(this.Component.CONFIRM)) return;
    this._newsService.remove(this.news)
      .then(() => {
        this.router.navigate(['/'])
          .then(() => this._toastrService.info(this.Component.DELETED));
      });
  }

  private createNews() {
    this._newsService.create(this.news)
      .then(() => this._toastrService.success(this.Component.SAVED));
  }

  selectFileAndUpload($event: Event) {
    this.onFileSelected($event);
    this.onUpload();
  }

  private onFileSelected($event) {
    this._uploadImageService.selectFile($event.target.files[0]);
  }

  private async onUpload() {
    await this._uploadImageService.uploadImage$(this.UPLOAD_LINK)
      .subscribe(value => {
        if (value.type === HttpEventType.UploadProgress)
          this.uploadProgress$ = Math.round(value.loaded / value.total * 100);
        else if (value.type === HttpEventType.Response) {
          (this.news.images) ? this.news.images.push(value.body.imageUrl) : this.news.images = [];
          this.news.images.push(value.body.imageUrl);
        }
      });
  }

  Component = {
    TITLE: 'Edycja newsa',
    UPDATED: 'Zaktualizowano',
    EXISTS: 'Istnieje, nie zapisano',
    CONFIRM: 'Czy chcesz usunąć aktualność?',
    DELETED: 'Usunięto',
    SAVED: 'Zapisano'
  };

  Validation = {
    TITLE: 'Podaj tytuł',

  };
}

