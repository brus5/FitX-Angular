import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from './auth.service';
import * as firebase from 'firebase/app';
import {MealTime} from '../models/meal-time';
import {Observable} from 'rxjs';
import {DietService} from '../../diet/services/diet.service';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  private firebaseUser = {} as firebase.User;

  constructor(private _db: AngularFireDatabase,
              private _auth: AuthService,
              private _dietService: DietService) {
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

  public getCustomHours(date: string): Observable<MealTime[]> {
    return this._auth.appUser$
      .switchMap(user => {
        if (user)
          return this._db.object<MealTime[]>('/meals/' + this.firebaseUser.uid + '/custom/' + date + '/meals-time').valueChanges();
        else
          return Observable.of(null);
      });
  }

  public removeCustomHour(date: string, id: number) {
    return this._db.object('/meals/' + this.firebaseUser.uid + '/custom/' + date + '/meals-time/' + id).remove();
  }

  public updateCustom(date: string, meals: Array<MealTime>) {
    return this._db.list('/meals/' + this.firebaseUser.uid + '/custom/' + date).set('/meals-time', meals);
  }

  public removeCustomHours(date: string) {
    return this._db.list('/meals/' + this.firebaseUser.uid + '/custom/' + date).remove();
  }

  public isCustom(date: string) {
    return this.custom(date)
      .switchMap(hours => {
        if (hours.length > 0)
          return Observable.of(true);
        else
          return Observable.of(false);
      })
  }

  public getDirtydHours(date: string): Observable<MealTime[]> {
    return this._auth.appUser$
      .switchMap(user => {
        if (user)
          return this._db.object<MealTime[]>('/meals/' + this.firebaseUser.uid + '/dirty/' + date + '/meals-time').valueChanges();
        else
          return Observable.of(null);
      });
  }

  public isDirty(date: string) {
    return this.dirty(date)
      .switchMap(hours => {
        if (hours.length > 0)
          return Observable.of(true);
        else
          return Observable.of(false);
      })
  }

  public removeDirtydHours(date: string) {
    return this._db.list('/meals/' + this.firebaseUser.uid + '/dirty/' + date).remove();
  }

  public updateDirty(date: string, meals: Array<MealTime>) {
    return this._db.list('/meals/' + this.firebaseUser.uid + '/dirty/' + date).set('/meals-time', meals);
  }

  private custom(date: string) {
    return this._db.list('/meals/' + this.firebaseUser.uid + '/custom/' + date).valueChanges();
  }

  private dirty(date: string) {
    return this._db.list('/meals/' + this.firebaseUser.uid + '/dirty/' + date).valueChanges();
  }

  private initialize() {
    this._auth.appUser$.subscribe(user => this.firebaseUser = user);
  }
}

