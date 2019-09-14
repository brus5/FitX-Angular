import {AppUser} from './app-user';
import {Nutrients} from './nutrients';
import {NutrientsPercentage} from './nutrients-percentage';
import {Somatotype} from './somatotype';
import {Trainings} from './trainings';

export class User implements AppUser {
  public height: number;
  public isAdmin: boolean;
  public isGender: boolean;
  public maxNutrients: Nutrients;
  public nutrientsPercentage: NutrientsPercentage;
  public somatotype: Somatotype;
  public trainings: Trainings;
  public weight: number;

  constructor(public email: string,
              public name: string,
              public uid: string) {}

  public mockStats(): AppUser {
    this.height = 150;
    this.weight = 50;
    this.isAdmin = false;
    this.isGender = false;
    this.maxNutrients = {maxCalories: 2000, proteins: 100, carbs: 100, fats: 100, isAutoCounting: true};
    this.nutrientsPercentage = {proteins: 40, carbs: 40, fats: 20};
    this.somatotype = {name: 'Mezomorfik', value: 400};
    this.trainings = {strenghtTime: 0, strenghtIntensity: false, areobicTime: 0, areobicIntensity: false};

    return this;
  }
}
