import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {News} from '../../shared/models/news';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private _aFire: AngularFirestore) {
  }

  public getAll(): Observable<News[]> {
    return this._aFire.collection<News>('news')
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            let data = action.payload.doc.data() as News;
            let id = action.payload.doc.id;
            return {id, ...data};
          });
        })
      );
  }

  public getNews(newsId: string): Observable<News> {
    return this._aFire.doc('news/' + newsId)
      .snapshotChanges().pipe(
        map(action => {
          let data = action.payload.data() as News;
          let id = action.payload.id;
          return {id, ...data};
        })
      )
  }



}
