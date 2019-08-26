import {ProductNutrition} from './product-nutrition';

export interface Product {
  key: string;
  name: string;
  imageUrl: string;
  category: string;
  nutrition: ProductNutrition;
  weight?: number;
}
