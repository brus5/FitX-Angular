import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {News} from '../../shared/models/news';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private _aFire: AngularFirestore) { }

  public getAll(): Observable<News[]> {
    return this._aFire.collection<News>('news').valueChanges();
  }

}
