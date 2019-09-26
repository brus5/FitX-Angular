import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';

@Component({
  selector: 'news-tile',
  templateUrl: './news-tile.component.html',
  styleUrls: ['./news-tile.component.scss']
})
export class NewsTileComponent {
  @Input('news') news: News;
}
