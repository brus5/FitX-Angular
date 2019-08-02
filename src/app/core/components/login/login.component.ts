import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Observable} from 'rxjs';
import * as firebase from 'firebase/app';
import {NavService} from '../services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  uid$: Observable<firebase.User>;
  isHandset$: Observable<boolean>;

  constructor(private _auth: AuthService,
              private _navService: NavService) {}

  ngOnInit() {
    this.uid$ = this._auth.appUser$;
    this.isHandset$ = this._navService.isHandset$;
  }

  login() {
    this._auth.login();
  }

  logout() {
    this._auth.logout();
  }
}
