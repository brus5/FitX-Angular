import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../services/news.service';
import {AuthService} from '../../../shared/services/auth.service';
import {AppUser} from '../../../shared/models/app-user';
import {Subscription} from 'rxjs';
import {LinkService} from '../../../shared/services/link.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  newses: News[] = [];
  appUser$ = {} as AppUser;

  Config = {
    MAX_TILES: 4,
    AD_SENSE_NEWS: 1,
  };

  private userSubscription: Subscription = new Subscription();
  private newsesSubscription: Subscription = new Subscription();

  constructor(private _authService: AuthService,
              private _newsService: NewsService,
              private _linkService: LinkService,
              private _auth: AuthService) { }

  ngOnInit() {
    this.userSubscription = this._authService.appUser$$
      .subscribe(user => user ? this.appUser$ = user : this.appUser$);
    this.newsesSubscription = this._newsService.getLatestNews()
      .subscribe(newses => {
        newses ? this.newses = newses : this.newses;
        this._newsService.loading = false;
      });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.newsesSubscription.unsubscribe();
    this._newsService.loading = true;
  }

  cuttedLink(link: string): string {
    return this._linkService.cutLink(link);
  }

  login() {
    this._auth.login();
  }

  get admin() {
    return this.appUser$.isAdmin;
  }

  get isLoading() {
    return this._newsService.loading;
  }
}
