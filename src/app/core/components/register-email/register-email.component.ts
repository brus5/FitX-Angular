import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {AppUser} from '../../../shared/models/app-user';

@Component({
  selector: 'register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.scss']
})
export class RegisterEmailComponent implements OnInit {

  appUser$: AppUser;
  user = {} as UserCridentials;
  retypePassword: string = null;
  validationError: boolean = false;

  constructor(private _auth: AuthService,
              private _toastrService: ToastrService,
              private _router: Router) {}

  ngOnInit() {
    this._auth.appUser$$.subscribe(user => this.appUser$ = user);
  }

  createUser() {
    if (this.passwordsMatches())
      this._auth.createUserWithEmailAndPassword(this.user)
        .then(() => this.redirectPage())
        .catch(error => this.showError(error.code));
    else
      this._toastrService.error('Hasła muszą być takie same.')
  }

  private passwordsMatches(): boolean {
    return (this.user.password == this.retypePassword);
  }

  private showError(errorCode: string) {
    switch (errorCode) {
      case Email.Error:
        this._toastrService.error('Niepoprawne dane');
        break;

      case Email.WeakPassword:
        this._toastrService.error('Hasło powinno mieć przynajmniej 6 znaków');
        break;

      case Email.AlreadyInUse:
        this._toastrService.error('Ten email jest już w użyciu');
        break;

      case Email.NotAllowed:
        this._toastrService.error('Email lub hasło nie są dostępne.');
        break;

      case Email.NotValid:
        this._toastrService.error('Email nieprawidłowy.');
        break;
    }
  }

  private redirectPage() {
    let message = this._toastrService.success("Udało Ci się pomyślnie zalogować, nastąpiło przekierowanie.");
    this._router.navigateByUrl('/')
        .then(() => message);
  }
}

enum Email {
  WeakPassword = 'auth/weak-password',
  AlreadyInUse = 'auth/email-already-in-use',
  Error = 'auth/argument-error',
  NotAllowed = 'auth/operation-not-allowed',
  NotValid = 'auth/invalid-email',
}
