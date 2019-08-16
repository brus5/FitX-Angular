import {Product} from './product';

export interface Meal {
  hour: string;
  products: Product[];
  weight: number;
}
