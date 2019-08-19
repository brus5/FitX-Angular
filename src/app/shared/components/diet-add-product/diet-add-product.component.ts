import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {fromEvent, Subject, Subscription} from 'rxjs';

@Component({
  selector: 'diet-add-product',
  templateUrl: './diet-add-product.component.html',
  styleUrls: ['./diet-add-product.component.scss']
})
export class DietAddProductComponent implements OnInit, OnDestroy {

  products$: Product[] = [];
  searchedProduct: string;
  changeCount: number = 0;

  isSearching: boolean;

  private searchSubscription: Subscription = new Subscription();
  private productsSubscription: Subscription = new Subscription();

  public keyUp = new Subject<string>();

  apiResponse: any;

  constructor(private _productService: ProductService) {
    this.isSearching = false;
    this.apiResponse = [];
  }

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

  private filterProducts(value: string){
    // TODO: `zrobić wyszukiwanie
    this.productsSubscription = this._productService.getByName(value)
      .subscribe(products => {
        this.products$ = products;
        console.log(products);
      });
  }


}

