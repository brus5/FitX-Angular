import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../services/news.service';
import {LinkService} from '../../../shared/services/link.service';

@Component({
  selector: 'news-big-tile',
  templateUrl: './news-big-tile.component.html',
  styleUrls: ['./news-big-tile.component.scss']
})
export class NewsBigTileComponent {
  @Input('news') news: News;
  @Input('isAdmin') isAdmin: boolean;

  constructor(private _newsService: NewsService,
              private _linkService: LinkService) {}

  get cuttedLink(): string {
    return this._linkService.cutLink(this.news.title)
  }
}
