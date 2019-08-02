import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';


@Component({
  selector: 'adsense-top',
  templateUrl: './adsense-top.component.html',
  styleUrls: ['./adsense-top.component.scss']
})
export class AdsenseTopComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) {
  }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

}
