import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';
import {NewsService} from '../../services/news.service';

@Component({
  selector: 'news-big-tile',
  templateUrl: './news-big-tile.component.html',
  styleUrls: ['./news-big-tile.component.scss']
})
export class NewsBigTileComponent {
  @Input('news') news: News;
  @Input('isAdmin') isAdmin: boolean;

  constructor(private _newsService: NewsService) {}

  get cuttedLink(): string {
    return this._newsService.cutLink(this.news.title)
  }
}
