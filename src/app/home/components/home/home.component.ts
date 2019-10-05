import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {NewsService} from '../../../news/services/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService,
              private _newsService: NewsService) {}

  ngOnInit() { this.isHandset$ = this._navService.isHandset$ }
  get newsLoading() { return this._newsService.loading }
}
