import {Component, OnInit} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newses: News[] = [];

  constructor(private _newsService: NewsService) { }

  ngOnInit() {
    this._newsService.getAll()
      .subscribe(newses => this.newses = newses);
  }
}
