import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NewsService} from '../../services/news.service';
import {News} from '../../../shared/models/news';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit, OnDestroy {

  @Input('newsId') newsId: string;

  news: News;

  private newsSubscription: Subscription = new Subscription();

  constructor(private _newsService: NewsService) { }

  ngOnInit() {
    if (this.newsId)
      this.newsSubscription = this._newsService.getNews(this.newsId)
        .subscribe(item => this.news = item);
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

}
