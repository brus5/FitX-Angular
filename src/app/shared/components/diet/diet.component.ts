import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import {MealsService} from '../../services/meals.service';
import {MealTime} from '../../models/meal-time';
import {ToastrService} from 'ngx-toastr';
import {DropdownListComponent} from '../dropdown-list/dropdown-list.component';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  @ViewChild('form', {static: false}) private formElement: NgForm;
  @ViewChild('addMealButtonElement', {static: false}) private addMelaButton: ElementRef;
  @ViewChild('dropdownListComponent', {static: false}) private dropdownListComponent: DropdownListComponent;

  hours$: Array<string> = [];

  public isHandset$: Observable<boolean>;

  meal = {} as MealTime;

  meals: MealTime[] = [];

  newMeal = false;
  editIndex: number;

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsService: MealsService,
              private _toastrService: ToastrService) {
  }

  async ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
    await this._mealsService.getAll
      .subscribe(mealsTime => {

        this.meals = mealsTime || [];

        const mealTimes: MealTime[] = [];

        this.meals.forEach(value => mealTimes.push(value));

        this._mealsService.update(mealTimes);
      });

    await this._mealsService.getMealHours
      .subscribe(hours => this.hours$ = hours);

  }

  onSelectedDate(date: string) {
    this._dietService.getDailyDiet(date)
      .subscribe(diet => {
        if (diet) console.log(diet);
      });
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
    this._mealsService.remove(id);
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
    this._mealsService.update(this.meals)
      .finally(() => this.toastSuccessful());
  }

  private resetMealValues() {
    this.meal = {} as MealTime;
  }

  private toastSuccessful(): void {
    this._toastrService.success('Dodano');
  }

  private toastWarning() {
    this._toastrService.warning('Nie dodano', 'Podana godzina już istnieje');
  }

  private hideForm() {
    this.addMelaButton.nativeElement.hidden = false;
  }
}
