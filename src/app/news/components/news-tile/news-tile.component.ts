import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../services/news.service';
import {LinkService} from '../../../shared/services/link.service';

@Component({
  selector: 'news-tile',
  templateUrl: './news-tile.component.html',
  styleUrls: ['./news-tile.component.scss']
})
export class NewsTileComponent {

  @Input('news') news: News;
  @Input('isAdmin') isAdmin: boolean;
  Config = {
    MAX_CHARS: 200
  };

  constructor(private _newsService: NewsService,
              private _linkService: LinkService) {}

  get cuttedContent(): string {
    return this._newsService.cutNews(this.news.contentShort, this.Config.MAX_CHARS);
  }

  get cuttedLink(): string {
    return this._linkService.cutLink(this.news.title)
  }

}
