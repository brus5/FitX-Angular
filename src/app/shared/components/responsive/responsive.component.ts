import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';

@Component({
  selector: 'responsive-switcher',
  templateUrl: './responsive.component.html',
  styleUrls: ['./responsive.component.scss']
})
export class ResponsiveComponent implements OnInit {

  isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

}
