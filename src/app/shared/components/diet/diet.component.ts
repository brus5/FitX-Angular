import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
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

  arr = [];

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsService: MealsService) {
  }

  async ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;

    await this._mealsService.getUserHours
      .subscribe(mealsTime => this.mealsTime = mealsTime || []);

    this.products.push();

  }

  onSelectedDate(date: string) {
    this.selectedDate = date;

    this._dietService.getAll(date)
      .subscribe(value => {
        this.arr = value;
        console.log(this.arr);
      });

    console.log(this.mealsTime);
  }

  onSend() {
    const prod: Product = {
      key: '-LlvVlTTU32OzPp6qJio',
      name: 'Ryż biały niegotowany',
      category: 'Warzywa',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/fitx-beba9.appspot.com/o/product-images%2Fconverted' +
        '-product-V13RyP-fd709428884b31552df23cbfcfb2ffe7%2C981%2C0%2C0%2C0.jpg?alt=media&token=7a8d5714-5c60-4e26-9fd8-4095c13a76be',
      nutrition: {
        kcal: 348.5,
        carbs: 79,
        fats: 0.5,
        proteins: 7
      }
    };

    const arr: Product[] = [];
    arr.push(prod);

    const meal: Meal = {
      hour: '17:30',
      weight: 100,
      products: arr
    };

    // this._dietService.create(this.selectedDate, '17:30', '-LlvVlTTU32OzPp6qJio', meal);
    this._dietService.create(this.selectedDate, meal);
  }
}
