import {Component, Input} from '@angular/core';
import {News} from '../../../shared/models/news';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent {
  @Input('news') news: News[];
}
