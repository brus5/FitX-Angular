import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NavService} from '../../../core/components/services/nav.service';
import {Observable, Subscription} from 'rxjs';
import {DietService} from '../../services/diet.service';
import {Meal} from '../../../shared/models/meal';
import {Product} from '../../../shared/models/product';
import {AppUser} from '../../../shared/models/app-user';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'diet-menu',
  templateUrl: './diet-bar.component.html',
  styleUrls: ['./diet-bar.component.scss']
})
export class DietBarComponent implements OnInit, OnChanges, OnDestroy {

  public isHandset$: Observable<boolean>;
  @Input() public date: string;
  meals: any = [];
  products: Product[] = [];
  appUser$ = {maxNutrients: {}} as AppUser;

  private dietSubscription: Subscription = new Subscription();
  private appUserSubscription: Subscription = new Subscription();

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _auth: AuthService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
    this.appUserSubscription = this._auth.appUser$$
      .subscribe(user => {

        this.appUser$ = user;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dietSubscription = this._dietService.getAll(this.date)
      .subscribe(meals => {
        this.clearProductsList();
        this.meals = meals;
        this.fillProducts(meals);
      });
  }

  ngOnDestroy() {
    this.dietSubscription.unsubscribe();
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

  get proteinsPercentage(): number {
    return this.countPercentage(this.proteins, this.appUser$.maxNutrients.proteins);
  }

  get carbsPercentage(): number {
    return this.countPercentage(this.carbs, this.appUser$.maxNutrients.carbs);
  }

  get fatsPercentage(): number {
    return this.countPercentage(this.fats, this.appUser$.maxNutrients.fats);
  }

  get caloriesPercentage(): number {
    return this.countPercentage(this.calories, this.appUser$.maxNutrients.maxCalories);
  }

  private countPercentage(percentUsage: number, maxPercentage: number): number {
    return Number(((percentUsage * 100) / maxPercentage).toFixed(0));
  }

  private clearProductsList() {
    this.products = [];
  }

  private fillProducts(meals: Meal[]) {
    for (let index in meals) {
      let value = meals[index];
      for (let key in value) {
        this.products.push(value[key].product);
      }
    }
  }
}
