import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';

@Component({
  selector: 'banner-main',
  templateUrl: './banner-main.component.html',
  styleUrls: ['./banner-main.component.scss']
})
export class BannerMainComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) { }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

}
