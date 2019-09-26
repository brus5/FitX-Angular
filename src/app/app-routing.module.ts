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
import {ProductsWaitingRoomComponent} from './admin/components/products-waiting-room/products-waiting-room.component';
import {AdminGuardService} from './shared/services/admin-guard.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'produkty', component: ProductsComponent},
  {path: 'logoff', component: LogoffComponent},
  {path: 'godziny-posilkow', component: DietHoursComponent, canActivate: [AuthGuardService]},
  {path: 'opcje-diety', component: DietOptionsComponent, canActivate: [AuthGuardService]},
  {path: 'poczekalnia-produktow', component: ProductsWaitingRoomComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {
    path: 'kalkulator-kalorii',
    component: CaloriesCalculatorComponent,
    data: {
      title: 'Kalkulator kalorii - Oblicz zapotrzebowanie kalorii',
      description: 'Kalkulator kalorii oblicza zapotrzebowanie na kalorie Twojego organizmu.',
      ogUrl: 'your og url'
    }
  },
  {
    path: 'dieta',
    component: DietComponent,
    canActivate: [AuthGuardService],
    data: {
      title: 'Dieta - Elektroniczny Przewodnik',
      description: 'Pozwala prowadzić dietę zgodnie z założeniami.',
      ogUrl: 'your og url'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
