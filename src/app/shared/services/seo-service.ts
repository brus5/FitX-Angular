import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {Seo} from '../models/seo';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private _aFire: AngularFirestore,
              private meta: Meta,
              private title: Title) {}

  public init(componentName?: string): Subscription {
    return this._aFire.doc<Seo>('seo/' + componentName)
      .valueChanges()
      .subscribe(seo => this.initTags(seo));
  }

  public unsubscribe(): void {
    this.init().unsubscribe();
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }
//TODO here
  private initTags(seo: Seo) {
    this.title.setTitle(seo.facebook.title);
    this.meta.addTags([
      {property: 'fb:app_id', content: seo.facebook.app_id},
      {property: 'og:url', content: seo.facebook.url},
      {property: 'og:title', content: seo.facebook.title},
      {property: 'og:image', content: seo.facebook.image},
      {property: 'og:type', content: seo.facebook.type},
      {property: 'og:description', content: seo.facebook.description},
      {name: 'twitter:card', content: seo.twitter.card},
      {name: 'twitter:site', content: seo.twitter.site},
      {name: 'twitter:title', content: seo.twitter.title},
      {name: 'twitter:description', content: seo.twitter.description},
      {name: 'twitter:image', content: seo.twitter.image},
      {name: 'twitter:creator', content: seo.twitter.creator},
    ]);
  }

}
