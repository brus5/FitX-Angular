import {Product} from './product';
import {Optional} from '@angular/core';
import {Meal} from './meal';

export class DietCalculator {

  constructor(@Optional() private products?: Product[],
              @Optional() private meals?: Meal[]) {}

  get totalCalories() {
    let totalCalories = null;
    this.products.forEach(product => totalCalories += product.nutrition.kcal);
    return totalCalories;
  }

  get totalProteins() {
    let totalProtiens = null;
    this.products.forEach(product => totalProtiens += product.nutrition.proteins);
    return totalProtiens;
  }

  get totalCarbs() {
    let totalCarbs = null;
    this.products.forEach(product => totalCarbs += product.nutrition.carbs);
    return totalCarbs;
  }

  get totalFats() {
    let totalFats = null;
    this.products.forEach(product => totalFats += product.nutrition.fats);
    return totalFats;
  }
}
