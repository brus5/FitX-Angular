import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

import {UserService} from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {AngularFireAuth} from '@angular/fire/auth';
import {AppUser} from '../models/app-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements Authentication {
  public user$: Observable<firebase.User>;

  constructor(
      private afAuth: AngularFireAuth,
      private route: ActivatedRoute,
      private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  loginWithEmail(user: UserCridentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  createUserWithEmailAndPassword(user: UserCridentials) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  get appUser$(): Observable<firebase.User> {
    return this.user$;
  }

  get appUser$$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user) return this.userService.get(user.uid);

        return Observable.of(null);
      });
  }
}
