import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'diet-add-product',
  templateUrl: './diet-add-product.component.html',
  styleUrls: ['./diet-add-product.component.scss']
})
export class DietAddProductComponent implements OnInit, OnDestroy {

  products$: Product[] = [];
  searchedProduct: string;
  isSearching: boolean;

  keyUp = new Subject<string>();

  private searchSubscription: Subscription = new Subscription();
  private productsSubscription: Subscription = new Subscription();

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    this.searchSubscription = this.keyUp.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(product => this.filterProducts(product));
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  private filterProducts(productName: string) {
    this.productsSubscription = this._productService.getProductByName(productName)
      .subscribe(products => this.products$ = products);
  }

}

