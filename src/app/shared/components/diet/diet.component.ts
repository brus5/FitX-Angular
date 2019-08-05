import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import {MealsService} from '../../services/meals.service';

@Component({
  selector: 'diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsService: MealsService) {
  }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
    this._mealsService.getMealsTime()
      .subscribe(value => {
        console.log(value)
      });
  }

  public onSelectedDate(date: string) {
    this._dietService.getDailyDiet(date)
      .subscribe(diet => {
        if (diet) {
          console.log(diet);
        }
      });
  }
}
