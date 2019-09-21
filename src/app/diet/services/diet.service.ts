import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from '../../shared/services/auth.service';
import * as firebase from 'firebase/app';
import {Meal} from '../../shared/models/meal';
import {map} from 'rxjs/operators';
import {Product} from '../../shared/models/product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DietService {

  firebaseUser = {} as firebase.User;

  constructor(private _db: AngularFireDatabase,
              private _auth: AuthService) {
    this.initialize();
  }

  private initialize() {
    this._auth.appUser$.subscribe(user => this.firebaseUser = user);
  }

  public addMeal(meal: Meal) {
    return this._db.list('/diets/' + this.firebaseUser.uid + '/' + meal.date + '/' + meal.hour).push(meal);
  }

  public getAll(date: string) {
    return this._db.list('/diets/' + this.firebaseUser.uid + '/' + date)
      .snapshotChanges().pipe(
        map(actions =>
          actions.map(action => (action.payload.val() as Meal))
      ));
  }

  public getMeals(date: string, time: string) {
    return this._db.list('/diets/' + this.firebaseUser.uid + '/' + date + '/' + time)
      .snapshotChanges().pipe(
        map(actions =>
          actions.map(action => (
            {key: action.payload.key, ...action.payload.val() as Meal}))
        ));
  }

  public remove(date: string, time: string, mealKey: string) {
    return this._db.list<Meal>('/diets/' + this.firebaseUser.uid + '/'
      + date + '/'
      + time + '/'
      + mealKey).remove();
  }

  public removeByDate(date: string) {
    return this._db.list('/diets/' + this.firebaseUser.uid + '/' + date).remove();
  }

  public removeByTime(date: string, time: string) {
    return this._db.list('/diets/' + this.firebaseUser.uid + '/' + date + '/' + time).remove();
  }

  public createMeal(date: string, time: string, product: Product, weight: number): Meal {
    product.weight = weight;
    product.nutrition = {
      proteins: ((product.nutrition.proteins * weight) / 100),
      fats: ((product.nutrition.fats * weight) / 100),
      carbs: ((product.nutrition.carbs * weight) / 100),
      kcal: ((product.nutrition.proteins * 4) +
        (product.nutrition.carbs * 4) +
        (product.nutrition.fats * 9)) * weight / 100
    };
    return {date: date, hour: time, product: product};
  }

  public checkDayContainMeals(date: string): Observable<boolean> {
    return this.getAll(date).switchMap(
      products => {
        if (products.length)
          return Observable.of(true);
        else
          return Observable.of(false);
      }
    )
  }
}
