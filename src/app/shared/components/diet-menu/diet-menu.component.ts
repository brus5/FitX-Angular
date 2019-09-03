import { Component, OnInit } from '@angular/core';
import {NavService} from '../../../core/components/services/nav.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'diet-menu',
  templateUrl: './diet-menu.component.html',
  styleUrls: ['./diet-menu.component.scss']
})
export class DietMenuComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) { }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

}
