import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

}
