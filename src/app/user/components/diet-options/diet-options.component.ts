import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {AppUser} from '../../../shared/models/app-user';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {DIET_OPTIONS_TITLE} from '../../../shared/components/titles';

@Component({
  selector: 'diet-options',
  templateUrl: './diet-options.component.html',
  styleUrls: ['./diet-options.component.scss']
})
export class DietOptionsComponent implements OnInit, OnDestroy, OnChanges {

  appUser$ = {
    nutrientsPercentage: {},
    maxNutrients: {},
    somatotype: {},
    trainings: {},
  } as AppUser;

  userId: string;

  private userAuthSubscription: Subscription = new Subscription();
  private appUserSubscription: Subscription = new Subscription();
  constructor(private _auth: AuthService,
              private _userService: UserService,
              private _toastrService: ToastrService) { }

  ngOnInit() {
    this.userAuthSubscription = this._auth.appUser$
      .subscribe(user => this.userId = user.uid);

    this.appUserSubscription = this._auth.appUser$$
      .subscribe(appUser => this.appUser$ = appUser);
  }

  ngOnDestroy() {
    this.userAuthSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onAccept() {
    this._userService.update(this.appUser$)
      .then(() => this._toastrService.success('Zaktualizowano'));
  }

  get areNutrientsValid(): boolean {
    return this.nutrientsAmount > 100 || this.nutrientsAmount < 100;
  }

  get nutrientsAmount() {
    return this.appUser$.nutrientsPercentage.proteins +
      this.appUser$.nutrientsPercentage.carbs +
      this.appUser$.nutrientsPercentage.fats;
  }

  get proteinsIntake(): number {
    return Number(this.calculateIntake(this.appUser$.nutrientsPercentage.proteins, false).toFixed(0));
  }

  get carbsIntake(): number {
    return Number(this.calculateIntake(this.appUser$.nutrientsPercentage.carbs, false).toFixed(0));
  }

  get fatsIntake(): number {
    return Number(this.calculateIntake(this.appUser$.nutrientsPercentage.fats, true).toFixed(0));
  }

  get dietOptionsTitle() {
    return DIET_OPTIONS_TITLE;
  }

  private calculateIntake(nutrient: number, isFat: boolean): number {
    if (isFat)
      return (((nutrient / 100) * this.appUser$.maxNutrients.maxCalories) / 9);
    else return (((nutrient / 100) * this.appUser$.maxNutrients.maxCalories) / 4);
  }
}
