import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Seo} from '../models/seo';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private _aFire: AngularFirestore,
              private meta: Meta,
              private title: Title) {}

  public getSeo(componentName: string): Observable<Seo> {
    let convertedName = componentName
      .replace('Component','.component')
      .toLowerCase();
    return this._aFire.doc<Seo>('seo/' + convertedName).valueChanges();
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }
}
