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
    MAX_WORDS: 50
  };

  constructor(private _newsService: NewsService) {}

  get readMore(): boolean {
    return (this.wordCount > this.Config.MAX_WORDS);
  }

  get wordCount() {
    return this.news.content.split(' ').length;
  }

  get cuttedContent(): string {
    return this._newsService.cutContent(this.news.content, this.Config.MAX_WORDS);
  }

  get cuttedLink(): string {
    return this._newsService.cutLink(this.news.title)
  }

}
