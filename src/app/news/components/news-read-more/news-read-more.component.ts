import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '../../services/news.service';
import {Observable, Subscription} from 'rxjs';
import {News} from '../../../shared/models/news';
import {SeoService} from '../../../shared/services/seo-service';
import {Seo} from '../../../shared/models/seo';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'news-read-more',
  templateUrl: './news-read-more.component.html',
  styleUrls: ['./news-read-more.component.scss']
})
export class NewsReadMoreComponent implements OnInit, OnDestroy {

  @Input('newsId') newsId: string;

  news = {} as News;

  private newsSubscription: Subscription = new Subscription();
  private initNewsSubscription: Subscription = new Subscription();
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private _newsService: NewsService,
              private _seo: SeoService) { }

  ngOnInit() {
    this.newsId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.newsId) {
      this.newsSubscription = this._newsService.getNews(this.newsId)
        .subscribe(item =>
           this.initNewsSubscription = this.initNews(item)
             .pipe(
               tap(() => this.initMeta())
             ).subscribe(_ => null)
        );
    }
  }

  ngOnDestroy() {
    this._seo.disconnect();
    this.newsSubscription.unsubscribe();
    this.initNewsSubscription.unsubscribe();
  }

  get written(): any {
    return this.news.date;
  }

  private initNews(item: News): Observable<any> {
    this.news = item;
    return Observable.of(item);
  }

  private initMeta() {
    let site = 'https://ekcal.pl/aktualnosci/' +
      this._newsService.cutLink(this.news.title) + '/' + this.newsId;

    let seo = {
      title: this.news.title,
      url: site,
      image: this.news.imageHeader,
      description: this.news.content,

      facebook: {
        app_id: this._seo.Facebook.APP_ID,
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        creator: this.news.creator
      }
    } as Seo;

    this._seo.clearTags()
      .pipe(
        tap(_ => this._seo.initTags(seo))
      ).subscribe(_ => null);
  }
}
