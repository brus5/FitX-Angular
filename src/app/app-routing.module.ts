import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './shared/components/home/home.component';
import {LoginComponent} from './core/components/login/login.component';
import {DietComponent} from './diet/components/diet/diet.component';
import {DietHoursComponent} from './diet/components/diet-hours/diet-hours.component';
import {ProfileComponent} from './user/components/profile/profile.component';
import {LogoffComponent} from './core/components/logoff/logoff.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {ProductsComponent} from './shared/components/products/products.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'diet', component: DietComponent},
  {path: 'diet-hours', component: DietHoursComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'logoff', component: LogoffComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
