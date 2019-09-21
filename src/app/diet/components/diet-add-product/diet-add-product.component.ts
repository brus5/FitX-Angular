import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ProductService} from '../../../product/services/product.service';
import {DietService} from '../../services/diet.service';
import {Product} from '../../../shared/models/product';
import {Meal} from '../../../shared/models/meal';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Subject, Subscription} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {MealHoursService} from '../../../shared/services/meals-hours.service';

@Component({
  selector: 'diet-add-product',
  templateUrl: './diet-add-product.component.html',
  styleUrls: ['./diet-add-product.component.scss']
})
export class DietAddProductComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild('confirmProductElement', {static: false}) private confirmProductElement: ElementRef;
  @ViewChild('addProductWeightButtonElement', {static: false}) private addProductWeightButtonElement: ElementRef;
  @ViewChild('weightInputElement', {static: false}) private weightInputElement: HTMLElement;
  @Input() public date: string;
  @Input() public time: string;
  keyUp = new Subject<string>();
  filteredProducts$: Product[] = [];
  dailyProducts$: Product[] = [];
  meals: Meal[] = [];
  searchedProduct: string;
  productWeight: number;
  isSearching: boolean;
  wasSearching: boolean;
  productsLimit: number = 10;

  private productsSubscription: Subscription = new Subscription();
  private selectedHoursSubscription: Subscription = new Subscription();
  private containsMealsSubscription: Subscription = new Subscription();

  constructor(private _productService: ProductService,
              private _dietService: DietService,
              private _toastrService: ToastrService,
              private _mealsHoursService: MealHoursService) {}

  ngOnInit() {
    this.productsSubscription = this._productService.getAll()
      .subscribe(products => this.filteredProducts$ = products);

    this._mealsHoursService.isCustom(this.date)
      .subscribe(isCustom => isCustom ? null : this.checkDayContainsMealSubscription());
  }

  ngOnChanges(changes: SimpleChanges) {
    this.clearDailyProducts();
    this._dietService.getMeals(this.date, this.time)
      .subscribe(meals => this.fillMeals(meals));
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.selectedHoursSubscription.unsubscribe();
    this.containsMealsSubscription.unsubscribe();
  }

  setProductWeight(value: number) {
    this.productWeight = value;
  }

  async addProductToList(product: Product, weight: number) {
    let meal = this._dietService.createMeal(this.date, this.time, product, weight);
    this._dietService.addMeal(meal);
    // this.clearFilteredProducts();
    this.clearQueryElement();
    this.productWeight = null;

    this.selectedHoursSubscription = this._mealsHoursService.isCustom(this.date)
      .subscribe(isCustom => {
        if (isCustom) this._mealsHoursService.removeSelectedHours(this.date);
        else this._mealsHoursService.getUserHours
          .subscribe(mealTimes => this._mealsHoursService.updateSelected(this.date, mealTimes));
      });
  }

  removeMeal(index: number) {
    this._dietService.remove(this.date, this.time, this.meals[index].key)
      .then(() => this._toastrService.success('Usunięto'));
  }

  onEnterPressed($event) {
    if ($event.key === 'Enter')
      this.confirmProductElement.nativeElement.click();
  }

  filter(query: string) {
    const filtered = (query) ?
      this.filteredProducts$.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase())) : this.filteredProducts$;
    this.isSearching = false;
  }

  private checkDayContainsMealSubscription() {
    return this.containsMealsSubscription = this._dietService.checkDayContainMeals(this.date)
      .subscribe(contains => {
        if (!contains) {
          this._mealsHoursService.removeSelectedHours(this.date);
          this._mealsHoursService.removeCustomHours(this.date);
        }
      })
  }

  private fillMeals(meals: Meal[]) {
    this.meals = meals;
    this.clearDailyProducts();
    meals.forEach(value => this.dailyProducts$.push(value.product));
    this.isSearching = false;
  }

  private clearDailyProducts() {
    this.dailyProducts$ = [];
  }

  private clearFilteredProducts() {
    this.filteredProducts$ = [];
  }

  private clearQueryElement() {
    this.searchedProduct = '';
  }

  get totalCalories() {
    let totalCalories = null;
    this.dailyProducts$.forEach(product => totalCalories += product.nutrition.kcal);
    return totalCalories;
  }

  get totalProteins() {
    let totalProtiens = null;
    this.dailyProducts$.forEach(product => totalProtiens += product.nutrition.proteins);
    return totalProtiens;
  }

  get totalCarbs() {
    let totalCarbs = null;
    this.dailyProducts$.forEach(product => totalCarbs += product.nutrition.carbs);
    return totalCarbs;
  }

  get totalFats() {
    let totalFats = null;
    this.dailyProducts$.forEach(product => totalFats += product.nutrition.fats);
    return totalFats;
  }

  // private filterProducts(productName: string) {
  //   if (productName) productName = productName.toLocaleLowerCase();
  //   this.productsSubscription = this._productService.getProductByName(productName)
  //     .subscribe(products => {
  //       if (products) this._productService.getProductByName1(productName).subscribe(products => console.log(products));
  //       this.filteredProducts$ = products;
  //       this.isSearching = false;
  //     });
  // }
  // onInputChanged() {
  //   this.isSearching = true;
  //   this.wasSearching = true;
  //   this.filteredProducts$ = [];
  // }
  //
  // onAddClicked(product) {
  //   this.clearFilteredProducts();
  //   this.filteredProducts$.push(product);
  // }
  //
  // ngOnInit() {
  //   this.searchSubscription = this.keyUp.pipe(
  //     debounceTime(1000),
  //     distinctUntilChanged()
  //   ).subscribe(product => this.filter(product));
  // }
}
