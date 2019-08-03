import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import 'rxjs-compat/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private _auth: AuthService,
              private _router: Router) {
  }

  canActivate(): Observable<boolean> {
    return this._auth.appUser$$.map(user => {
      if (user)
        return true;

      this._router.navigate(['/login'], {skipLocationChange: true});
      return false;
    });
  }
}
