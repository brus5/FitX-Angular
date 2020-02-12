import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {SeoService} from '../../../shared/services/seo-service';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {NewsService} from '../../../news/services/news.service';
import {LinkService} from '../../../shared/services/link.service';
import {Seo} from '../../../shared/models/seo';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  @Input() productId: string;

  product = {
    name: '',
    nutrition: {}
  } as Product;

  private productSubscription: Subscription = new Subscription();
  private initProductSubscription: Subscription = new Subscription();

  constructor(private _productService: ProductService,
              private _activatedRoute: ActivatedRoute,
              private _seo: SeoService,
              private _newsService: NewsService,
              private _linkService: LinkService) {}

  ngOnInit() {
    this.productId = this._activatedRoute.snapshot.paramMap.get('id');
    if (this.productId)
      this.productSubscription = this._productService.getProduct(this.productId)
        .subscribe(prod =>
          this.initProductSubscription = this.initProduct(prod)
            .pipe(
              tap(() => this.initMeta())
            ).subscribe());
  }

  ngOnDestroy() {
    this.productSubscription.unsubscribe();
    this.initProductSubscription.unsubscribe();
    this._seo.disconnect();
  }

  cuttedLink(link: string): string {
    return this._linkService.cutLink(link);
  }

  productName() {
    return this.product.name.charAt(0).toUpperCase() + this.product.name.slice(1);
  }

  private initProduct(prod: Product): Observable<any> {
    this.product = prod;
    return Observable.of(prod);
  }

  private initMeta() {
    let site = 'https://ekcal.pl/produkt/' +
      this._linkService.cutLink(this.product.name) + '/' + this.productId;

    let seo = {
      title: this.product.name.charAt(0).toUpperCase() + this.product.name.substring(1),
      url: site,
      image: this.product.imageUrl,
      description: 'Bi: ' + this.product.nutrition.proteins + 'g ' +
                    'Ww: ' + this.product.nutrition.carbs + 'g ' +
                    'Tł: ' + this.product.nutrition.fats + 'g ',

      facebook: {
        app_id: this._seo.Facebook.APP_ID,
        type: 'site'
      },
      twitter: {
        card: 'summary_large_image',
        creator: 'eKcal.pl'
      }
    } as Seo;

    this._seo.clearTags()
      .pipe(
        tap(_ => this._seo.initTags(seo))
      ).subscribe();
  }


}
