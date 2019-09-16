import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './home/components/home/home.component';
import {LoginComponent} from './core/components/login/login.component';
import {DietComponent} from './diet/components/diet/diet.component';
import {DietHoursComponent} from './diet/components/diet-hours/diet-hours.component';
import {CaloriesCalculatorComponent} from './shared/components/calories-calculator/calories-calculator.component';
import {LogoffComponent} from './core/components/logoff/logoff.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {ProductsComponent} from './product/components/products/products.component';
import {DietOptionsComponent} from './user/components/diet-options/diet-options.component';
import {ProductsWaitingRoomComponent} from './product/components/products-waiting-room/products-waiting-room.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'produkty', component: ProductsComponent},
  {path: 'logoff', component: LogoffComponent},
  {path: 'diet', component: DietComponent, canActivate: [AuthGuardService]},
  {path: 'diet-hours', component: DietHoursComponent, canActivate: [AuthGuardService]},
  {path: 'kalkulator-kalorii', component: CaloriesCalculatorComponent},
  {path: 'opcje-diety', component: DietOptionsComponent, canActivate: [AuthGuardService]},
  {path: 'poczekalnia-produktow', component: ProductsWaitingRoomComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
