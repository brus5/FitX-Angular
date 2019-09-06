import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from './auth.service';
import * as firebase from 'firebase/app';
import {MealTime} from '../models/meal-time';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealHoursService {

  private firebaseUser = {} as firebase.User;

  constructor(private _db: AngularFireDatabase,
              private _auth: AuthService) {
    this.initialize();
  }

  public get getUserHours(): Observable<MealTime[]> {
    return this._auth.appUser$
      .switchMap(user => {
        if (user)
          return this._db.object<MealTime[]>('/meals/' + this.firebaseUser.uid + '/meals-time').valueChanges();
        else
          return Observable.of(null);
      });
  }

  public get getAllHours(): Observable<string[]> {
    return this._auth.appUser$
      .switchMap(user => {
        if (user)
          return this._db.object<string[]>('/meal-hours').valueChanges();
        else
          return Observable.of(null);
      });
  }

  public update(meals: Array<MealTime>) {
    return this._db.list('/meals/' + this.firebaseUser.uid).set('/meals-time', meals);
  }

  public remove(id: number) {
    return this._db.object('/meals/' + this.firebaseUser.uid + '/meals-time/' + id).remove();
  }

  private initialize() {
    this._auth.appUser$.subscribe(user => this.firebaseUser = user);
  }
}

