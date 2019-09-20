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
export class DietCustomHoursComponent implements OnDestroy {

  @Input('date') date: string;

  private subscription: Subscription = new Subscription();

  constructor(private _router: Router,
              private _dietService: DietService,
              private _mealHoursService: MealHoursService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  confirm() {
    this.subscription = this._mealHoursService.isCustom(this.date)
      .subscribe(exists => this.customHours(exists));
  }

  private customHours(exists: boolean) {
    if (!exists) {
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
