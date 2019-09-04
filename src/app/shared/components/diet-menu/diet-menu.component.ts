import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NavService} from '../../../core/components/services/nav.service';
import {Observable, Subscription} from 'rxjs';
import {DietService} from '../../services/diet.service';
import {Meal} from '../../models/meal';
import {Product} from '../../models/product';

@Component({
  selector: 'diet-menu',
  templateUrl: './diet-menu.component.html',
  styleUrls: ['./diet-menu.component.scss']
})
export class DietMenuComponent implements OnInit, OnChanges, OnDestroy {

  public isHandset$: Observable<boolean>;
  @Input() public date: string;

  meals: any = [];

  products: Product[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private _navService: NavService,
              private _dietService: DietService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.subscription = this._dietService.getAll(this.date)
      .subscribe(meals => {
        this.clearProductsList();
        this.meals = meals;
        this.fillProducts(meals);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get calories() {
    let totalCalories = 0;
    this.products.forEach(value => totalCalories += value.nutrition.kcal);
    return totalCalories;
  }

  get proteins() {
    let totalProteins = 0;
    this.products.forEach(value => totalProteins += value.nutrition.proteins);
    return totalProteins;
  }

  get carbs() {
    let totalCarbs = 0;
    this.products.forEach(value => totalCarbs += value.nutrition.carbs);
    return totalCarbs;
  }

  get fats() {
    let totalFats = 0;
    this.products.forEach(value => totalFats += value.nutrition.fats);
    return totalFats;
  }

  private clearProductsList() {
    this.products = [];
  }

  private fillProducts(meals: Meal[]) {
    for (let index in meals) {
      let value = meals[index];
      for (let key in value)
        this.products.push(value[key].product)
    }
  }
}
