import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';

@Component({
  selector: 'news-big-tile',
  templateUrl: './news-big-tile.component.html',
  styleUrls: ['./news-big-tile.component.scss']
})
export class NewsBigTileComponent {
  @Input('news') news: News;
}
