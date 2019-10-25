import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {SeoService} from '../../../shared/services/seo-service';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {NewsService} from '../../../news/services/news.service';

@Component({
  selector: 'product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  @Input() productId: string;

  product = { nutrition: {} } as Product;

  private productSubscription: Subscription = new Subscription();
  private initProductSubscription: Subscription = new Subscription();

  constructor(private _productService: ProductService,
              private _activatedRoute: ActivatedRoute,
              private _seo: SeoService,
              private _newsService: NewsService) {}

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

  private initProduct(prod: Product): Observable<any> {
    this.product = prod;
    return Observable.of(prod);
  }

  private initMeta() {
    let site = 'https://ekcal.pl/produkt/' +
      this._newsService.cutLink(this.product.name) + '/' + this.productId;
  }


}
