import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from './auth.service';
import * as firebase from 'firebase/app';
import {Meal} from '../models/meal';
import {map} from 'rxjs/operators';


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

  public create(date: string, meal: Meal) {
    return this._db.list('/diets/' + this.firebaseUser.uid + '/' + date).push(meal);
  }

  public getAll(date: string) {
    return this._db.list('/diets/' + this.firebaseUser.uid + '/' + date)
      .snapshotChanges().pipe(
        map(actions =>
          actions.map(action => (
            {key: action.payload.key, ...action.payload.val() as Meal}))
        )
      );
  }

}
