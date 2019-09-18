import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {NAV_LINKS} from '../../../core/components/navigation/menu';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) { }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

  get menuLinks() {
    return NAV_LINKS;
  }

}
