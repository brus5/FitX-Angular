import {NutrientsPercentage} from './nutrients-percentage';
import {Nutrients} from './nutrients';
import {Somatotype} from './somatotype';
import {Trainings} from './trainings';

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  isGender: boolean;
  isAdmin: boolean;
  weight?: number;
  height?: number;
  nutrientsPercentage?: NutrientsPercentage;
  maxNutrients?: Nutrients;
  somatotype?: Somatotype;
  trainings?: Trainings;
}
