import {Product} from './product';

export interface Meal {
  key?: string;
  date: string;
  hour: string;
  product?: Product;
  products?: Product[];
}
