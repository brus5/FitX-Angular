import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NewsService} from '../../services/news.service';
import {News} from '../../../shared/models/news';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit, OnDestroy {

  @Input('newsId') newsId: string;

  news = {bigHeader: false} as News;

  private newsSubscription: Subscription = new Subscription();
// TODO 4
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _newsService: NewsService,
              private _toastrService: ToastrService) { }

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

