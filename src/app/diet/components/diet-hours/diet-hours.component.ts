import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../../../core/components/services/nav.service';
import {Observable, Subscription} from 'rxjs';
import {DietService} from '../../services/diet.service';
import {HoursService} from '../../../shared/services/hours.service';
import {ToastrService} from 'ngx-toastr';
import {MealTime} from '../../../shared/models/meal-time';
import {NgForm} from '@angular/forms';
import {DropdownListComponent} from '../../../shared/components/dropdown-list/dropdown-list.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'diet-hours',
  templateUrl: './diet-hours.component.html',
  styleUrls: ['./diet-hours.component.scss']
})
export class DietHoursComponent implements OnInit, OnDestroy {

  @Input('date') date: string;
  @ViewChild('form', {static: false}) private formElement: NgForm;
  @ViewChild('addMealButtonElement', {static: false}) private addMelaButton: ElementRef;
  @ViewChild('dropdownListComponent', {static: false}) private dropdownListComponent: DropdownListComponent;

  hours$: Array<string> = [];
  public isHandset$: Observable<boolean>;
  meal = {} as MealTime;
  meals: MealTime[] = [];
  areProductsExists: boolean;

  private customHoursSubscription: Subscription = new Subscription();
  private userHoursSubscription: Subscription = new Subscription();
  private hoursSubscription: Subscription = new Subscription();
  private existsSubscription: Subscription = new Subscription();

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsHoursService: HoursService,
              private _toastrService: ToastrService,
              private _activatedRoute: ActivatedRoute) {}

  async ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;

    this.date = this._activatedRoute.snapshot.paramMap.get('date');
    if (this.date)
      this.customHoursSubscription = this._mealsHoursService.getCustomHours(this.date)
        .subscribe(mealsTime => this.fetchMeals(mealsTime));
    else
      this.userHoursSubscription = this._mealsHoursService.getUserHours
        .subscribe(mealsTime => this.fetchMeals(mealsTime));

    this.hoursSubscription = this._mealsHoursService.getAllHours
      .subscribe(hours => this.hours$ = hours);

    this.existsSubscription = this._dietService.checkDayContainMeals(this.date)
      .subscribe(exists => this.areProductsExists = exists);
  }

  ngOnDestroy() {
    this.customHoursSubscription.unsubscribe();
    this.userHoursSubscription.unsubscribe();
    this.hoursSubscription.unsubscribe();
    this.existsSubscription.unsubscribe();
  }

  private async fetchMeals(mealsTime: MealTime[]) {
    this.meals = mealsTime || [];
    const mealTimes: MealTime[] = [];
    this.meals.forEach(value => mealTimes.push(value));
    if (this.date)
      await this._mealsHoursService.updateCustom(this.date, mealTimes);
    else
      await this._mealsHoursService.update(mealTimes);
  }

  onAccept(): void {
    if (!this.mealExists()) {
      this.addMeal();
      this.sortMealsByTime();

      this.saveMeals();

      this.resetMealValues();
      this.hideForm();
    } else this.toastWarning();
  }

  async delete(id: number) {
    if (!confirm('Chcesz usunąć godzinę posiłku?')) return;
    if (this.date) {
      this._dietService.removeByTime(this.date, this.meals[id].time)
        .then(() => this.removedSuccessful());
      await this._mealsHoursService.removeCustomHour(this.date, id);
    }
    else this._mealsHoursService.remove(id)
      .then(() => this.removedSuccessful());
  }

  get hours(): string[] {
    return this.hours$;
  }

  resetForm() {
    this.resetMealValues();
    this.formElement.reset();
    this.dropdownListComponent.onClear();
  }

  async deleteDailyHours() {
    if (this.areProductsExists) {
      if (!confirm('Wygląda na to, że są już dodane produkty w tym dniu. przywrócenie globalnych godzin spowoduje ' +
        'usunięcie wszystkich produktów z tego dnia.')) return;
      this.removeCustomHours();
      await this._dietService.removeByDate(this.date);
    } else
      this.removeCustomHours();
  }

  get dietHoursTitle() {
    return 'Godziny posiłków';
  }

  get description() {
    return 'Dzięki godzinom posiłków będziesz w stanie kontrolować co, ile i o której godzinie ' +
      'powinieneś jeść. Skontrolowane równych odstępów czasu zagwarantuje Ci, że podczas dnia ' +
      'przestaniesz odczuwać głód i nie będziesz mieć głodowych napadów. Zacznijmy ' +
      'od największej ilości węglowodanów od rana, stopniowo zmniejszając wraz ze wzrostem godzin i ' +
      'na wieczór starajmy się unikać węglowodanowych posiłków. Powodzenia! :)';
  }

  private mealExists(): boolean {
    const existingTime = this.meals.find(value => this.meal.time === value.time);
    return existingTime !== undefined;
  }

  private addMeal() {
    this.meals.push(this.meal);
  }

  private sortMealsByTime() {
    this.meals.sort((a, b) => (a.time > b.time) ? 1 : -1);
  }

  private resetMealValues() {
    this.meal = {} as MealTime;
  }

  private toastSuccessful(): void {
    this._toastrService.success('Dodano');
  }

  private removedSuccessful(): void {
    this._toastrService.success('Usunięto');
  }

  private toastWarning() {
    this._toastrService.warning('Nie dodano', 'Podana godzina już istnieje');
  }

  private hideForm() {
    this.addMelaButton.nativeElement.hidden = false;
  }

  private saveMeals() {
    if (this.date)
      this._mealsHoursService.updateCustom(this.date, this.meals)
        .finally(() => this.toastSuccessful());
    else
      this._mealsHoursService.update(this.meals)
        .finally(() => this.toastSuccessful());
  }

  private removeCustomHours() {
    this._mealsHoursService.removeCustomHours(this.date)
      .then(() => this.removedSuccessful());
  }

}
