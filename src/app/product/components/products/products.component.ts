import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductService} from '../../services/product.service';
import {Observable, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  public isHandset$: Observable<boolean>;

  products: Product[];
  private subscription: Subscription;

  constructor(
    private _navService: NavService,
    private _productService: ProductService) {
  }

  async ngOnInit() {
    this.subscription = this._productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
    this.isHandset$ = this._navService.isHandset$;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    const filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    this.initializeTable(filteredProducts);
  }

  private remove(product: Product) {
    this._productService.remove(product.key);
  }

  private getProduct(key: string) {
    this._productService.getProduct(key)
      .subscribe(product => console.log(product));
  }

  private initializeTable(products: Product[]) {


  }
}
