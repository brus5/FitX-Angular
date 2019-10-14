import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {Observable, Subscription} from 'rxjs';
import {News} from '../../../shared/models/news';
import * as AOS from 'aos';
import {SeoService} from '../../../shared/services/seo-service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'news-read-more',
  templateUrl: './news-read-more.component.html',
  styleUrls: ['./news-read-more.component.scss']
})
export class NewsReadMoreComponent implements OnInit, OnDestroy {

  @Input('newsId') newsId: string;

  news = {} as News;

  private newsSubscription: Subscription = new Subscription();
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _newsService: NewsService,
              private _seo: SeoService,
              private meta: Meta,
              private title: Title) { }

  ngOnInit() {
    AOS.init({
      disable: 'mobile',
      offset: 0,
      once: true,
    });
    this.newsId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.newsId)
      this.newsSubscription = this._newsService.getNews(this.newsId)
        .subscribe(item => {
          this.initNews(item);
          this.initMetaTags();
        });
  }

  ngOnDestroy() {
  }

  get written(): any {
    return this.news.date;
  }

  private initNews(item: News): Observable<any> {
    this.news = item;
    return Observable.of(item);
  }

  private initMetaTags() {
    //TODO work here
    this.title.setTitle(this.news.title);
    this.meta.addTags([
      {property: 'fb:app_id', content: '2439007089753255'},
      {property: 'og:url', content: this.news.title + '/' + this.newsId},
      {property: 'og:title', content: this.news.title},
      {property: 'og:image', content: this.news.imageHeader},
      {property: 'og:type', content: 'article'},
      {property: 'og:description', content: this.news.content},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: this.title + '/' + this.newsId},
      {name: 'twitter:title', content: this.news.title},
      {name: 'twitter:description', content: this.news.content},
      {name: 'twitter:image', content: this.news.imageHeader},
      {name: 'twitter:creator', content: 'Łukasz Krawczak'},
    ])
  }
}
