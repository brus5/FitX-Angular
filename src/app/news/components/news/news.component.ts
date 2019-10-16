import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../services/news.service';
import {AuthService} from '../../../shared/services/auth.service';
import {AppUser} from '../../../shared/models/app-user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  newses: News[] = [];
  appUser$ = {} as AppUser;

  Config = {
    MAX_TILES: 4
  };

  private userSubscription: Subscription = new Subscription();
  private newsesSubscription: Subscription = new Subscription();

  constructor(private _authService: AuthService,
              private _newsService: NewsService) { }

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
    return this._newsService.cutLink(link);
  }

  get admin() {
    return this.appUser$.isAdmin;
  }

  get isLoading() {
    return this._newsService.loading;
  }

}
