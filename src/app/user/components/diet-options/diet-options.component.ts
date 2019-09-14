import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppUser} from '../../../shared/models/app-user';
import {AuthService} from '../../../shared/services/auth.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'diet-options',
  templateUrl: './diet-options.component.html',
  styleUrls: ['./diet-options.component.scss']
})
export class DietOptionsComponent implements OnInit, OnDestroy {

  appUser$ = {nutrientsPercentage: {}} as AppUser;
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
    return this.calculateIntake(this.appUser$.nutrientsPercentage.proteins, false);
  }

  get carbsIntake(): number {
    return this.calculateIntake(this.appUser$.nutrientsPercentage.carbs, false);
  }

  get fatsIntake(): number {
    return this.calculateIntake(this.appUser$.nutrientsPercentage.fats, true);
  }

  private calculateIntake(nutrient: number, isFat: boolean): number {
    if (isFat)
      return (((nutrient / 100) * this.appUser$.maxNutrients.maxCalories) / 9);
    else return (((nutrient / 100) * this.appUser$.maxNutrients.maxCalories) / 4);
  }

}
