import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }
}
