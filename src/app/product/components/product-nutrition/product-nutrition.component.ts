import {Component, Input, OnInit} from '@angular/core';
import {ProductNutrition} from '../../../shared/models/product-nutrition';
import {Observable} from 'rxjs';

@Component({
  selector: 'product-nutrition',
  templateUrl: './product-nutrition.component.html',
  styleUrls: ['./product-nutrition.component.scss']
})
export class ProductNutritionComponent {
  @Input('nutrition') nutrition: ProductNutrition;
  @Input('isHandset') isHandset: Observable<boolean>;

  get proteinsCalories(): number {
    return this.number(this.nutrition.proteins * 4);
  }

  get carbsCalories(): number {
    return this.number(this.nutrition.carbs * 4);
  }

  get fatsCalories(): number {
    return this.number(this.nutrition.fats * 9);
  }

  private number(num: number): number {
    return Number(num.toFixed(0));
  }
}
