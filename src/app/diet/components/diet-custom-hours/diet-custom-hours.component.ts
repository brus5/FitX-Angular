import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DietService} from '../../services/diet.service';
import {MealHoursService} from '../../../shared/services/meals-hours.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'diet-custom-hours',
  templateUrl: './diet-custom-hours.component.html',
  styleUrls: ['./diet-custom-hours.component.scss']
})
export class DietCustomHoursComponent implements OnInit, OnDestroy {

  @Input('date') date: string;

  private customSuscription: Subscription = new Subscription();
  private containsMealsSubscription: Subscription = new Subscription();

  private customHoursExists: boolean;
  private dayContainsMeals: boolean;

  constructor(private _router: Router,
              private _dietService: DietService,
              private _mealHoursService: MealHoursService) { }

  ngOnInit() {
    this.customSuscription = this._mealHoursService.isCustom(this.date)
      .subscribe(exists => this.customHoursExists = exists);

    this.containsMealsSubscription = this._dietService.checkDayContainMeals(this.date)
      .subscribe(contains => this.dayContainsMeals = contains);
  }

  ngOnDestroy() {
    this.customSuscription.unsubscribe();
    this.containsMealsSubscription.unsubscribe();
  }

  confirm() {
    if (this.dayContainsMeals && !this.customHoursExists) {
      if (!confirm('Czy na pewno chcesz modyfikować godziny posiłków w tym dniu? Spowoduje to usunięcie dotychczasowych pozycji.')) return;
      this._dietService.removeByDate(this.date);
      this.nextPage();
    }
    else this.nextPage();
  }

  private nextPage() {
    this._router.navigate(['/godziny-posilkow/edycja', this.date]);
  }
}
