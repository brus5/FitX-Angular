import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'news-tile',
  templateUrl: './news-tile.component.html',
  styleUrls: ['./news-tile.component.scss']
})
export class NewsTileComponent {

  @Input('news') news: News;
  @Input('isAdmin') isAdmin: boolean;
  Config = {
    MAX_WORDS: 200
  };

  constructor(private _newsService: NewsService) {}

  get cuttedContent(): string {
    return this._newsService.cutNews(this.news.content, this.Config.MAX_WORDS);
  }

  get cuttedLink(): string {
    return this._newsService.cutLink(this.news.title)
  }

}
