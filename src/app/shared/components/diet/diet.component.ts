import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import {MealsService} from '../../services/meals.service';
import {MealTime} from '../../models/meal-time';
import {ToastrService} from 'ngx-toastr';
import {DropdownListComponent} from '../dropdown-list/dropdown-list.component';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  constructor(private _navService: NavService,
              private _dietService: DietService) {}

  async ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
  }

  onSelectedDate(date: string) {
    this._dietService.getDailyDiet(date)
      .subscribe(diet => {
        if (diet) console.log(diet);
      });
  }
}
