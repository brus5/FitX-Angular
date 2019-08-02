import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'logoff',
  template: ''
})
export class LogoffComponent implements OnInit {

  constructor(private _auth: AuthService,
              private _router: Router) {}

  ngOnInit() {
    this._auth.logout();
    this.mainPage();
  }

  private mainPage() {
    this._router.navigateByUrl('');
  }

}
