import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {AppUser} from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) {
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();
  }

  update(appUser: AppUser) {
    return this.db.object('/users/' + appUser.uid).update(appUser);
  }

}

