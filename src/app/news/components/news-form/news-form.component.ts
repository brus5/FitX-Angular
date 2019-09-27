import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NewsService} from '../../services/news.service';
import {News} from '../../../shared/models/news';
import {ActivatedRoute} from '@angular/router';
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
  private existsSubscription: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
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
    this.existsSubscription.unsubscribe();
  }

  onSave() {
    if (this.newsId)
      this._newsService.update(this.news)
        .then(() => this._toastrService.success(this.Component.SAVE));
    else
      this.createNews();
  }

  deleteNews() {

  }

  private createNews() {

    this.news.id = this.news.title
      .replace(/\s/g, '-')
      .toLocaleLowerCase();

    this._newsService.exists(this.news)
      .subscribe(value => console.log(value));

    // this._newsService.create(this.news)
    //   .then(() => this._toastrService.success(this.Component.SAVE));
  }

  Component = {
    TITLE: 'Edycja newsa',
    SAVE: 'Zapisano'
  };

  Validation = {
    TITLE: 'Podaj tytuł',

  };

}

