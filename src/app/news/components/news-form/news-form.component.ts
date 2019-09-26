import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {

  @Input('newsId') newsId: string;

  constructor() { }

  ngOnInit() {
  }

}
