import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {News} from '../../shared/models/news';
import {map} from 'rxjs/operators';
import {Seo} from '../../shared/models/seo';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  Config = {
    MAX_WORDS: 5,
    MAX_LATEST_NEWS: 16,
  };

  private isLoading: boolean = true;

  constructor(private _aFire: AngularFirestore) {}

  public getLatestNews(): Observable<News[]> {
    return this._aFire.collection<News>('news', ref =>
      ref.orderBy('date','desc').limit(this.Config.MAX_LATEST_NEWS))
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

  public getAllArchive(): Observable<any> {
    return this._aFire.collection<News>('news', ref =>
      ref.orderBy('date', 'desc'))
      .snapshotChanges().pipe(
        map(actions => {
          return actions.map(action => {
            let title = action.payload.doc.data().title;
            let id = action.payload.doc.id;
            return {id, title}
          })
        })
      )
  }

  public update(news: News) {
    return this._aFire.doc('news/' + news.id).update(news);
  }

  public create(news: News) {
    const randomId = this._aFire.createId();
    news.id = randomId;
    news.date = new Date().toString();
    return this._aFire.collection('news').doc(randomId).set(news);
  }

  public remove(news: News) {
    return this._aFire.doc('news/' + news.id).delete();
  }

  public createSeo(newsId: string, seo: Seo) {
    return this._aFire.doc('seo/' + newsId).set(seo);
  }

  public cutLink(str: string): string {
    return this.removeAccents(
      str
        .split(' ')
        .splice(0, this.Config.MAX_WORDS)
        .join(' ')
        .replace(/\s/g, '-')
    ).toLowerCase();
  }

  public cutContent(content: string, maxWords: number): string {
    return content
      .split(' ')
      .splice(0, maxWords)
      .join(' ');
  }

  public cutNews(content: string, maxChars: number): string {
    return content.substring(0, maxChars) + '...';
  }

  public set loading(loading: boolean) {
    this.isLoading = loading;
  }

  public get loading(): boolean {
    return this.isLoading;
  }

  private removeAccents(strAccents): string {
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
    strAccentsOut = <any>strAccentsOut.join('');
    return strAccentsOut.toString();
  }

}
