import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {DietService} from '../../services/diet.service';
import {Product} from '../../models/product';
import {Meal} from '../../models/meal';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';

@Component({
  selector: 'diet-add-product',
  templateUrl: './diet-add-product.component.html',
  styleUrls: ['./diet-add-product.component.scss']
})
export class DietAddProductComponent implements OnInit, OnDestroy, OnChanges {

  @Input() public date: string;
  @Input() public time: string;

  keyUp = new Subject<string>();

  filteredProducts$: Product[] = [];

  dailyProducts$: Product[] = [];

  meals: Meal[] = [];

  searchedProduct: string;

  productWeight: number;

  private searchSubscription: Subscription = new Subscription();
  private productsSubscription: Subscription = new Subscription();

  constructor(private _productService: ProductService,
              private _dietService: DietService) {}

  ngOnInit() {
    this.searchSubscription = this.keyUp.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(product => this.filterProducts(product));
  }

  ngOnChanges(changes: SimpleChanges) {
    this.clearDailyProducts();
    this._dietService.getMeals(this.date, this.time)
      .subscribe(meals => this.fillMeals(meals));
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }

  setProductWeight(value: number) {
    this.productWeight = value;
  }

  addProductToList(product: Product, weight: number) {
    product.weight = weight;
    this.dailyProducts$.push(product);
    let meal: Meal = {
      date: this.date,
      hour: this.time,
      products: this.dailyProducts$
    };

    this._dietService.addMeal(this.date, this.time, meal);
  }

  removeMeal(index: number) {
    this._dietService.remove(this.date, this.time, this.meals[index].key);
  }

  private filterProducts(productName: string) {
    this.productsSubscription = this._productService.getProductByName(productName)
      .subscribe(products => this.filteredProducts$ = products);
  }

  private fillMeals(meals: Meal[]) {
    this.meals = meals;
    meals.map(value => this.dailyProducts$ = value.products);
    if (meals.length === 0)
      this.clearDailyProducts();
  }

  private clearDailyProducts() {
    this.dailyProducts$ = [];
  }
}
