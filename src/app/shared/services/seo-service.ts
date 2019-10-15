import {Injectable} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {AngularFirestore} from '@angular/fire/firestore';
import {Subscription} from 'rxjs';
import {Seo} from '../models/seo';
import {NewsService} from '../../news/services/news.service';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  Facebook = {
    APP_ID_TAG: 'fb:app_id',
    URL: 'og:url',
    TITLE: 'og:title',
    IMAGE: 'og:image',
    TYPE: 'og:type',
    DESC: 'og:description',
    APP_ID: '2439007089753255'
  };

  Twitter = {
    CARD: 'twitter:card',
    SITE: 'twitter:site',
    TITLE: 'twitter:title',
    DESC: 'twitter:description',
    IMAGE: 'twitter:image',
    CREATOR: 'twitter:creator',
  };

  constructor(private _aFire: AngularFirestore,
              private meta: Meta,
              private title: Title,
              private _newsService: NewsService) {}

  public init(componentName?: string): Subscription {
    return this._aFire.doc<Seo>('seo/' + componentName)
      .valueChanges()
      .subscribe(seo => this.initTags(seo));
  }

  public updateTitle(title: string) {
    this.title.setTitle(title);
  }

  public initTags(seo: Seo) {
    this.pageTitle = seo.facebook.title;
    this.fbId = seo.facebook.app_id;
    this.fbUrl = seo.facebook.url;
    this.fbTitle = seo.facebook.title;
    this.fbImage = seo.facebook.image;
    this.fbType = seo.facebook.type;
    this.fbDescription = seo.facebook.description.substring(0, 149);

    this.twCard = seo.twitter.card;
    this.twSite = seo.twitter.site;
    this.twTitle = seo.twitter.title;
    this.twDescription = seo.twitter.description.substring(0, 199);
    this.twImage = seo.twitter.image;
    this.twCreator = seo.twitter.creator;
  }

  public disconnect(): void {
    this.unsubscribe();
    this.clearTags();
  }

  private unsubscribe(): void {
    this.init().unsubscribe();
  }

  private clearTags(): void {
    this.meta.removeTag('property=' + '"' + this.Facebook.APP_ID_TAG + '"');
    this.meta.removeTag('property=' + '"' + this.Facebook.URL + '"');
    this.meta.removeTag('property=' + '"' + this.Facebook.TITLE + '"');
    this.meta.removeTag('property=' + '"' + this.Facebook.IMAGE + '"');
    this.meta.removeTag('property=' + '"' + this.Facebook.TYPE + '"');
    this.meta.removeTag('property=' + '"' + this.Facebook.DESC + '"');
    this.meta.removeTag('name=' + '"' + this.Twitter.CARD + '"');
    this.meta.removeTag('name=' + '"' + this.Twitter.SITE + '"');
    this.meta.removeTag('name=' + '"' + this.Twitter.TITLE + '"');
    this.meta.removeTag('name=' + '"' + this.Twitter.DESC + '"');
    this.meta.removeTag('name=' + '"' + this.Twitter.IMAGE + '"');
    this.meta.removeTag('name=' + '"' + this.Twitter.CREATOR + '"');
  }

  private set pageTitle(title: string) {
    this.title.setTitle(title);
  }

  private set fbId(id: string) {
    this.meta.addTag({property: this.Facebook.APP_ID_TAG, content: id})
  }

  private set fbUrl(url: string) {
    this.meta.addTag({property: this.Facebook.URL, content: url})
  }

  private set fbTitle(title: string) {
    this.meta.addTag({property: this.Facebook.TITLE, content: title})
  }

  private set fbImage(imageUrl: string) {
    this.meta.addTag({property: this.Facebook.IMAGE, content: imageUrl})
  }

  private set fbType(type: string) {
    this.meta.addTag({property: this.Facebook.TYPE, content: type})
  }

  private set fbDescription(desc: string) {
    this.meta.addTag({property: this.Facebook.DESC, content: desc})
  }

  private set twCard(card: string) {
    this.meta.addTag({name: this.Twitter.CARD, content: card})
  }

  private set twSite(site: string) {
    this.meta.addTag({name: this.Twitter.SITE, content: site})
  }

  private set twTitle(title: string) {
    this.meta.addTag({name: this.Twitter.TITLE, content: title})
  }

  private set twDescription(desc: string) {
    this.meta.addTag({name: this.Twitter.DESC, content: desc})
  }

  private set twImage(imageUrl: string) {
    this.meta.addTag({name: this.Twitter.IMAGE, content: imageUrl})
  }

  private set twCreator(creator: string) {
    this.meta.addTag({name: this.Twitter.CREATOR, content: creator})
  }
}
