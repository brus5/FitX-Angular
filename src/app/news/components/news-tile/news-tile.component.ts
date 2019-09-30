import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';

@Component({
  selector: 'news-tile',
  templateUrl: './news-tile.component.html',
  styleUrls: ['./news-tile.component.scss']
})
export class NewsTileComponent {
  @Input('news') news: News;
  @Input('isAdmin') isAdmin: boolean;
  config = {
    maxWords: 50,
  };

  get readMore(): boolean {
    return (this.wordCount > this.config.maxWords);
  }

  get wordCount() {
    return this.news.content.split(' ').length;
  }

  get cuttedContent(): string {
    return this.news.content.split(' ').splice(0, this.config.maxWords).join(' ');
  }
}

