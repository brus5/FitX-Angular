import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }
}
