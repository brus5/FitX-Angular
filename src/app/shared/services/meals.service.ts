import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from './auth.service';
import * as firebase from 'firebase/app';
import {MealsTime} from '../models/meals-time';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  private firebaseUser = {} as firebase.User;

  constructor(private _db: AngularFireDatabase,
              private _auth: AuthService) {
    this.initialize();
  }

  private initialize() {
    this._auth.appUser$.subscribe(user => this.firebaseUser = user);
  }

  public get getMealsTime$(): Observable<MealsTime[]> {
    return this._auth.appUser$
      .switchMap(user => {
        if (user)
          return this._db.object<MealsTime[]>('/meals/' + this.firebaseUser.uid + '/meals-time').valueChanges();
        else
          return Observable.of(null);
      });
  }

  public addMealTime(mealTime: string, mealName: string) {
    return this._db.list('/meals/' + this.firebaseUser.uid + '/meals-time').set(mealTime, mealName);
  }
}

