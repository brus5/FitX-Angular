import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {AppUser} from '../../../shared/models/app-user';

@Component({
  selector: 'google-button',
  templateUrl: './google-button.component.html',
  styleUrls: ['./google-button.component.scss']
})
export class GoogleButtonComponent implements OnInit {

  appUser$: AppUser;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.appUser$$.subscribe(user => this.appUser$ = user);
  }

  login() {
    this._auth.login();
  }

  logout() {
    this._auth.logout();
  }
}
