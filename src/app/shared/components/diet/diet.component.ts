import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import 'rxjs/add/operator/mergeMap';
import {Product} from '../../models/product';
import {Meal} from '../../models/meal';
import {MealsService} from '../../services/meals.service';
import {MealTime} from '../../models/meal-time';

@Component({
  selector: 'diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  mealsTime: MealTime[] = [];

  products: Product[] = [];

  selectedDate!: string;

  meals: Meal[] = [];

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsService: MealsService) {
  }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;

    this._mealsService.getUserHours
      .subscribe(mealsTime => this.mealsTime = mealsTime || []);

    this.products.push();

  }

  onSelectedDate(date: string) {
    this.selectedDate = date;

    this._dietService.getAll(date)
      .subscribe(meals => {
        this.meals = meals;
      });
  }
}
