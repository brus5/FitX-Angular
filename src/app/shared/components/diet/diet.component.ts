import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';

@Component({
  selector: 'diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

  public onSelectedDate(event: string) {
    console.log(event);
  }
}
