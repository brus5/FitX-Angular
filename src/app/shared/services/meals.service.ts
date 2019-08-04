import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from './auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MealsService {

  firebaseUser = {} as firebase.User;

  constructor(private _db: AngularFireDatabase,
              private _auth: AuthService) {
    this.initialize();
  }

  private initialize() {
    this._auth.appUser$.subscribe(user => this.firebaseUser = user);
  }

  public getMealsTime() {
    return this._db.object('/meals/' + this.firebaseUser.uid + '/meals-time').valueChanges();
  }
}
