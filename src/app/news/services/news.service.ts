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
      );
  }

  public update(news: News) {
    return this._aFire.doc('news/' + news.id).update(news);
  }

  public create(news: News) {
    const randomId = this._aFire.createId();
    news.id = randomId;
    return this._aFire.collection('news').doc(randomId).set(news);
  }

  public remove(news: News) {
    return this._aFire.doc('news/' + news.id).delete();
  }
// TODO 2
  public removeAccents(strAccents): string {
    var strAccents = strAccents.split('');
    var strAccentsOut = [];
    const strAccentsLen = strAccents.length;
    let accents = 'ÀÁÂÃÄÅĄàáâãäåąßÒÓÔÕÕÖØŐòóôőõöøĎďDŽdžÈÉÊËĘèéêëęðÇçČčĆćÐÌÍÎÏìíîïÙÚÛÜŰùűúûüĽĹŁľĺłÑŇŃňñńŔŕŠŚšśŤťŸÝÿýŽŻŹžżź';
    let accentsOut = "AAAAAAAaaaaaaasOOOOOOOOoooooooDdDZdzEEEEEeeeeeeCcCcCcDIIIIiiiiUUUUUuuuuuLLLlllNNNnnnRrSSssTtYYyyZZZzzz";
    for (let y = 0; y < strAccentsLen; y++) {
      if (accents.indexOf(strAccents[y]) != -1) {
        strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
      } else
        strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut.toString();
  }

}
