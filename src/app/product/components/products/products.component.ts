import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductService} from '../../services/product.service';
import {Observable, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {AuthService} from '../../../shared/services/auth.service';
import {DataTableResource} from 'angular5-data-table';
import {User} from '../../../shared/models/user';
import {AppUser} from '../../../shared/models/app-user';
import {SeoService} from '../../../shared/services/seo-service';
import {LinkService} from '../../../shared/services/link.service';

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
  private isSearching: boolean;

  constructor(private _navService: NavService,
              private _productService: ProductService,
              private _auth: AuthService,
              private _seo: SeoService,
              private _linkService: LinkService) {}

  async ngOnInit() {
    this.productsSubscription = this._productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.initializeTable(products);
      });
    this.isHandset$ = this._navService.isHandset$;

    this.userAuthSubscription = this._auth.appUser$$
      .subscribe(appUser => this.appUser$ = appUser);

    this._seo.init('products.component');
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this._seo.disconnect();
    this._productService.loading = true;
  }

  filter(query: string) {
    const filteredProducts = (query) ?
      this.products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())) :
      this.products;
    this.isSearching = (query) ? true : false;
    this.filteredItems = filteredProducts;
    this.initializeTable(filteredProducts);
  }

  pageChanged($event) {
    if (this.isSearching)
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

  get productsLoading() {
    return this._productService.loading;
  }

  get description() {
    return '<p>Produkty są małymi cegiełkami naszego zdrowego organizmu. Dzięki świadomemu odżywianiu jesteśmy w stanie ' +
      'odróżnić produkt zdrowy i naturalny od niezdrowego i przetworzonego. Trzymając się kilku zasad jesteśmy w stanie ' +
      'polepszyć nasze zdrowe odżywianie:</p>\n' +
      '<ol> \n' +
      '<li>Jedz jak najmniej cukrów.</li>\n' +
      '<li>Jedz produkty mało przetworzone albo naturalne.</li>\n' +
      '<li>Nawadniaj organizm pijąc odpowiednią ilość wody.</li>\n' +
      '<li>Jedz w regularnych odstępach czasu.</li>\n' +
      '<li>Nie objadaj się</li>\n' +
      '</ol>\n' +
      '\n' +
      '<p>Produkty dzielimy na:</p>\n' +
      '<p><b>Białkowe</b>, które mają kluczowe znaczenie dla prawidłowego funkcjonowania. Jest to jedyny budulec mięśni ' +
      'oraz wszelkich tkanek w naszym organizmie. Nie wszystkie produkty białkowe są pełnowartościowe, ale na pewno nimi ' +
      'są wszelkie mięsa i ryby.</p>\n' +
      '\n' +
      '<p><b>Węglowodany</b>, które są wykorzystywane przez nasz organizm do syntezy glukozy. Glukoza jest paliwem dla ' +
      'naszego całego ciała i mózgu. Występują w różnych formach: cukrach prostych oraz bardziej złożonych np. skrobi lub ' +
      'błonnika. Najbardziej wartościowymi są warzywa, owoce, rośliny strączkowe oraz pełne ziarna zbóż. Dodatkowo bardzo ' +
      'dobrym źródłem węglowodanów są różnego rodzaju ryże lub kasze.</p>\n' +
      '\n' +
      '<p><b>Tłuszcze</b>, jest sumą wszystkich spożywanych tłuszczy: nasyconych, jednonienasyconych, wielonasyconych i ' +
      'tłuszczów trans. Są jednym z trzech źródeł energii dla organizmu (tuż obok białek i węglowodanów). Jeden gram tłuszczu ' +
      'zawiera aż 9 kilokalorii w przeciwieństwie do białek i węglowodanów gdzie jeden gram ma 4 kilokalorie.</p>';
  }

  productLink(product: Product): string {
    return this._linkService.cutLink(product.name);
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

    setTimeout(_ => {
      this._productService.loading = false;
    },1000);
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
