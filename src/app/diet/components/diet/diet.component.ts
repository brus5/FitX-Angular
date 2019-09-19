import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import 'rxjs/add/operator/mergeMap';
import {Product} from '../../../shared/models/product';
import {Meal} from '../../../shared/models/meal';
import {MealHoursService} from '../../../shared/services/meals-hours.service';
import {MealTime} from '../../../shared/models/meal-time';

@Component({
  selector: 'diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit, OnDestroy {

  public isHandset$: Observable<boolean>;
  mealsTime: MealTime[] = [];
  products: Product[] = [];
  selectedDate!: string;
  meals: Meal[] = [];
  dailyHours: MealTime[] = [];

  private dailyMealsSubscription: Subscription = new Subscription();
  private mealsHoursSubscription: Subscription = new Subscription();

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsHoursService: MealHoursService) {
  }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;

    this.products.push();

  }

  ngOnDestroy() {
    this.mealsHoursSubscription.unsubscribe();
    this.dailyMealsSubscription.unsubscribe();
  }

  async onSelectedDate(date: string) {
    this.selectedDate = date;
    this.dailyHours = null;

    await this._mealsHoursService.getDailyHours(date)
      .subscribe(dailyHours => this.dailyHours = dailyHours);

    this.mealsHoursSubscription = await this._mealsHoursService.getUserHours
      .subscribe(hours => {
        if (this.dailyHours)
          this.mealsTime = this.dailyHours || [];
        else
          this.mealsTime = hours || [];
      });
  }

  get dietTitle() {
    return 'Dieta';
  }
}
