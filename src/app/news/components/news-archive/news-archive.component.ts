import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from '../../services/news.service';
import {Subscription} from 'rxjs';
import {News} from '../../../shared/models/news';

@Component({
  selector: 'news-archive',
  templateUrl: './news-archive.component.html',
  styleUrls: ['./news-archive.component.scss']
})
export class NewsArchiveComponent implements OnInit, OnDestroy {

  newses: News[] = [];

  private archiveSubscription: Subscription = new Subscription();

  constructor(private _newsService: NewsService) { }

  ngOnInit() {
    this.archiveSubscription = this._newsService.getAllArchive()
      .subscribe(newses =>  newses ? this.newses = newses : this.newses);
  }

  ngOnDestroy(): void {
    this.archiveSubscription.unsubscribe();
  }

  cuttedLink(link: string): string {
    return this._newsService.cutLink(link);
  }

}
