import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import 'rxjs/add/operator/mergeMap';
import {Product} from '../../../shared/models/product';
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
  customHours: MealTime[] = [];
  selectedHours: MealTime[] = [];

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
    this.customHours = null;
    this.selectedHours = null;

    await this._mealsHoursService.getCustomHours(date)
      .subscribe(customHours => this.customHours = customHours);

    this.mealsHoursSubscription = await this._mealsHoursService.getUserHours
      .first()
      .finally(() => {
        this.subscribeCustomHours();
      })
      .subscribe(hours => this.mealsTime = hours || []);
  }
// TODO po dodaniu ogolnych godin posilkow aktualizuje sie tez w meals / id / selected / ..
//  a nie może się aktualizować. To musi pozostać statyczne. problem jest gdzies tutaj

  private async subscribeCustomHours(): Promise<Subscription> {
    return this._mealsHoursService.getCustomHours(this.selectedDate)
      .first()
      .finally(() => this.subscribeSelectedHours())
      .subscribe(customHours => {
        if (customHours) {
          this.mealsTime = customHours;
          this._mealsHoursService.removeSelectedHours(this.selectedDate);
        }
      });
  }

  private subscribeSelectedHours(): Subscription {
    return this._mealsHoursService.getSelectedHours(this.selectedDate)
      .subscribe(selectedHours => {
        if (selectedHours)
          this.mealsTime = selectedHours;
      });
  }

  get dietTitle() {
    return 'Dieta';
  }

}
