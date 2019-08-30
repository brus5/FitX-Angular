import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {DietService} from '../../services/diet.service';
import {Product} from '../../models/product';
import {Meal} from '../../models/meal';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

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
              private _dietService: DietService,
              private _toastrService: ToastrService) {}

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
    let meal: Meal = {
      date: this.date,
      hour: this.time,
      product: product
    };

    this._dietService.addMeal(meal);
  }

  removeMeal(index: number) {
    this._dietService.remove(this.date, this.time, this.meals[index].key)
      .then(() => this._toastrService.success('Usunięto'));
  }

  get caloriesSum(){
    let calSum = null;
    this.dailyProducts$.forEach(prod => calSum += prod.nutrition.kcal);
    return calSum;
  }

  private filterProducts(productName: string) {
    this.productsSubscription = this._productService.getProductByName(productName)
      .subscribe(products => this.filteredProducts$ = products);
  }

  private fillMeals(meals: Meal[]) {
    this.meals = meals;
    this.clearDailyProducts();
    meals.forEach(value => this.dailyProducts$.push(value.product));
  }

  private clearDailyProducts() {
    this.dailyProducts$ = [];
  }
}
