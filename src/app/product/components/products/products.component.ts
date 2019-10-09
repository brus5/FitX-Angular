import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductService} from '../../services/product.service';
import {Observable, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {AuthService} from '../../../shared/services/auth.service';
import {DataTableResource} from 'angular5-data-table';
import {User} from '../../../shared/models/user';
import {AppUser} from '../../../shared/models/app-user';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean>;
  config = {
    itemsPerPage: 7,
    currentPage: 1
  };
  appUser$ = this.mockUser();
  tableResouce: DataTableResource<Product>;

  products: Product[] = [];
  initializedItems: Product[] = [];
  filteredItems: Product[] = [];

  private productsSubscription: Subscription;
  private userAuthSubscription: Subscription = new Subscription();
  private itemCount: number;
  private isSeraching: boolean;

  constructor(private _navService: NavService,
              private _productService: ProductService,
              private _auth: AuthService) {}

  async ngOnInit() {
    this.productsSubscription = this._productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
    this.isHandset$ = this._navService.isHandset$;

    this.userAuthSubscription = this._auth.appUser$$
      .subscribe(appUser => this.appUser$ = appUser);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  filter(query: string) {
    const filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    this.isSeraching = (query) ? true : false;
    this.filteredItems = filteredProducts;
    this.initializeTable(filteredProducts);
  }

  pageChanged($event) {
    if (this.isSeraching)
      this.pageChangedWhileTyping($event);
    else
      this.pageChangedNormally($event);
  }

  toUpperCase(name: string) {
    return name.charAt(0).toUpperCase() + name.substring(1);
  }

  get fileredProductsCount(): number {
    return this.itemCount;
  }

  get productsTitle() {
    return 'Lista produktów';
  }

  private remove(product: Product) {
    this._productService.remove(product.key);
  }

  private initializeTable(products: Product[]) {
    this.tableResouce = new DataTableResource<Product>(products);
    this.tableResouce.query({offset: 0, limit: this.config.itemsPerPage})
      .then(items => this.initializedItems = items);
    this.tableResouce.count()
      .then(count => this.itemCount = count);
  }

  private pageChangedWhileTyping($event): void {
    const startItem = ($event.page - 1) * $event.itemsPerPage;
    const endItem = $event.page * $event.itemsPerPage;
    this.initializedItems = this.filteredItems.slice(startItem, endItem);
  }


  private pageChangedNormally($event): void {
    const startItem = ($event.page - 1) * $event.itemsPerPage;
    const endItem = $event.page * $event.itemsPerPage;
    this.initializedItems = this.products.slice(startItem, endItem);
  }

  private mockUser(): AppUser {
    return new User(null, null, null).mockStats();
  }
}
