import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NavService} from '../../../core/components/services/nav.service';
import {Observable} from 'rxjs';
import {DietService} from '../../services/diet.service';
import {MealsHours} from '../../services/meals-hours.service';
import {ToastrService} from 'ngx-toastr';
import {MealTime} from '../../models/meal-time';
import {NgForm} from '@angular/forms';
import {DropdownListComponent} from '../dropdown-list/dropdown-list.component';

@Component({
  selector: 'diet-hours',
  templateUrl: './diet-hours.component.html',
  styleUrls: ['./diet-hours.component.scss']
})
export class DietHoursComponent implements OnInit {

  @ViewChild('form', {static: false}) private formElement: NgForm;
  @ViewChild('addMealButtonElement', {static: false}) private addMelaButton: ElementRef;
  @ViewChild('dropdownListComponent', {static: false}) private dropdownListComponent: DropdownListComponent;

  hours$: Array<string> = [];

  public isHandset$: Observable<boolean>;

  meal = {} as MealTime;

  meals: MealTime[] = [];

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsHoursService: MealsHours,
              private _toastrService: ToastrService) {
  }

  async ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
    await this._mealsHoursService.getUserHours
      .subscribe(mealsTime => {

        this.meals = mealsTime || [];

        const mealTimes: MealTime[] = [];

        this.meals.forEach(value => mealTimes.push(value));

        this._mealsHoursService.update(mealTimes);
      });

    await this._mealsHoursService.getAllHours
      .subscribe(hours => this.hours$ = hours);

  }

  onSendMealTime(): void {
    if (!this.mealExists()) {
      this.addMeal();
      this.sortMealsByTime();
      this.setMeals();

      this.resetMealValues();
      this.hideForm();
    } else this.toastWarning();
  }

  delete(id: number): void {
    if (!confirm('Chcesz usunąć posiłek?')) return;
    this._mealsHoursService.remove(id)
      .then(() => this.removedSuccessful());
  }

  getCategories(): Observable<string[]> {
    return Observable.of(this.hours$);
  }

  onTimeSelected($event: string) {
    this.meal.time = $event;
  }

  resetForm() {
    this.resetMealValues();
    this.formElement.reset();
    this.dropdownListComponent.onClear();
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

  private setMeals() {
    this._mealsHoursService.update(this.meals)
      .finally(() => this.toastSuccessful());
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

}
