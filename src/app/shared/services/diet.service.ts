import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AuthService} from './auth.service';
import * as firebase from 'firebase/app';

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

  public getDailyDiet(date: string) {
    return this._db.object('/diets/' + this.firebaseUser.uid + '/' + date).valueChanges();
  }
}
