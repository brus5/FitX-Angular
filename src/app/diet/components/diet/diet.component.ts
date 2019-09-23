import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import 'rxjs/add/operator/mergeMap';
import {Product} from '../../../shared/models/product';
import {HoursService} from '../../../shared/services/hours.service';
import {MealTime} from '../../../shared/models/meal-time';

@Component({
  selector: 'diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit, OnDestroy {

  public isHandset$: Observable<boolean>;
  mealsTime: MealTime[] = [];
  selectedDate!: string;
  isDirty: boolean;
  isLoading: boolean;

  private customHoursSubscription: Subscription = new Subscription();
  private isDirtySubscription: Subscription = new Subscription();
  private usersHoursSubscription: Subscription = new Subscription();
  private dirtyHoursSubscription: Subscription = new Subscription();

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsHoursService: HoursService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

  ngOnDestroy() {
    this.customHoursSubscription.unsubscribe();
    this.isDirtySubscription.unsubscribe();
    this.usersHoursSubscription.unsubscribe();
    this.dirtyHoursSubscription.unsubscribe();
  }

  async onSelectedDate(date: string) {
    this.selectedDate = date;
    this.isLoading = true;

    this.isDirtySubscription = await this._mealsHoursService.isDirty(date)
      .subscribe(dirty => this.isDirty = dirty);

    this.usersHoursSubscription = await this._mealsHoursService.getUserHours
      .first()
      .finally(() => this.subscribeCustomHours())
      .subscribe(userHours => this.mealsTime = userHours);
  }

  private async subscribeCustomHours(): Promise<Subscription> {
    return this._mealsHoursService.getCustomHours(this.selectedDate)
      .first()
      .finally(() => this.subscribeDirtyHours())
      .subscribe(customHours => {
        if (customHours) {
          this.mealsTime = customHours;
          this._mealsHoursService.removeDirtydHours(this.selectedDate);
        }
      });
  }

  private subscribeDirtyHours(): Subscription {
    return this.dirtyHoursSubscription = this._mealsHoursService.getDirtydHours(this.selectedDate)
      .subscribe(dirtyHours => {
        if (dirtyHours)
          this.mealsTime = dirtyHours;
        this.isLoading = false; // finished loading in process
      });
  }

  get dietTitle() {
    return 'Dieta';
  }

}
