import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../../shared/models/news';

@Component({
  selector: 'news-tile',
  templateUrl: './news-tile.component.html',
  styleUrls: ['./news-tile.component.scss']
})
export class NewsTileComponent implements OnInit {
  @Input('news') news: News;

  constructor() { }

  ngOnInit() {
  }

}
