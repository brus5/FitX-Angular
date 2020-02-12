import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'google-email',
  templateUrl: './google-email.component.html',
  styleUrls: ['./google-email.component.scss']
})
export class GoogleEmailComponent implements OnInit {

  uid$: Observable<firebase.User>;
  user = {
    email: '',
    password: ''
  } as UserCridentials;

  constructor(private _auth: AuthService,
              private _toastrService: ToastrService) { }

  ngOnInit() {
    this.uid$ = this._auth.appUser$;
  }

  login() {
    this._auth.loginWithEmail(this.user)
      .catch(error => this.showError(error.code));
  }

  private showError(errorCode: string) {
    switch (errorCode) {
      case Email.WrongPassword:
        this._toastrService.error('Niepoprawne hasło lub zły sposób logowania');
        break;

      case Email.UserNotFound:
        this._toastrService.error('Nie odnaleziono użytkownika');
        break;

      case Email.Invalid:
        this._toastrService.error('Niepoprawny email');
        break;
    }
  }
}

enum Email {
  WrongPassword = 'auth/wrong-password',
  UserNotFound = 'auth/user-not-found',
  Invalid = 'auth/invalid-email',
}
