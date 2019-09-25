import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';

interface News {
  title: string
  content: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  newsCollection: AngularFirestoreCollection<News>;
  news: Observable<News[]>;

  constructor(private _navService: NavService,
              private _angularFstore: AngularFirestore) {
  }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
    this.newsCollection = this._angularFstore.collection('news');
    this.news = this.newsCollection.valueChanges();
  }
}
