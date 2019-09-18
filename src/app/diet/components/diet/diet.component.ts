import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import 'rxjs/add/operator/mergeMap';
import {Product} from '../../../shared/models/product';
import {Meal} from '../../../shared/models/meal';
import {MealHoursService} from '../../../shared/services/meals-hours.service';
import {MealTime} from '../../../shared/models/meal-time';
import {DIET_TITLE} from '../../../shared/components/titles';

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
              private _mealsHoursService: MealHoursService) {
  }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;

    this._mealsHoursService.getUserHours
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

  get componentTitle() {
    return DIET_TITLE;
  }
}
