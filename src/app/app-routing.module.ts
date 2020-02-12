import {NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';

import {HomeComponent} from './home/components/home/home.component';
import {LoginComponent} from './core/components/login/login.component';
import {DietComponent} from './diet/components/diet/diet.component';
import {DietHoursComponent} from './diet/components/diet-hours/diet-hours.component';
import {CaloriesCalculatorComponent} from './calculator/components/calories-calculator/calories-calculator.component';
import {LogoffComponent} from './core/components/logoff/logoff.component';
import {AuthGuardService} from './shared/services/auth-guard.service';
import {ProductsComponent} from './product/components/products/products.component';
import {DietOptionsComponent} from './user/components/diet-options/diet-options.component';
import {ProductsWaitingRoomComponent} from './admin/components/products-waiting-room/products-waiting-room.component';
import {AdminGuardService} from './shared/services/admin-guard.service';
import {NewsFormComponent} from './news/components/news-form/news-form.component';
import {AboutusComponent} from './aboutus/components/aboutus/aboutus.component';
import {ContactComponent} from './contact/components/contact/contact.component';
import {HelpComponent} from './help/components/help/help.component';
import {ErrorComponent} from './error/components/error/error.component';
import {RegisterEmailComponent} from './core/components/register-email/register-email.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Nowości w eKcal'}
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {title: 'Logowanie'}
  },
  {
    path: 'produkty',
    component: ProductsComponent,
    data: {title: 'Produkty żywnościowe'}
  },
  {
    path: 'logoff',
    component: LogoffComponent
  },
  {
    path: 'godziny-posilkow',
    component: DietHoursComponent,
    canActivate: [AuthGuardService],
    data: {title: 'Godziny posiłków'}
  },
  {
    path: 'opcje-diety',
    component: DietOptionsComponent,
    canActivate: [AuthGuardService],
    data: {title: 'Opcje diety'}
  },
  {
    path: 'poczekalnia-produktow',
    component: ProductsWaitingRoomComponent,
    canActivate: [AuthGuardService, AdminGuardService],
    data: {title: 'Poczekalnia produktów'}
  },
  {
    path: 'kalkulator-kalorii',
    component: CaloriesCalculatorComponent,
    data: {title: 'Kalkulator kalorii - Oblicz zapotrzebowanie kalorii'}
  },
  {
    path: 'dieta',
    component: DietComponent,
    canActivate: [AuthGuardService],
    data: {title: 'Dieta - Elektroniczny Przewodnik'}
  },
  {
    path: 'aktualnosci-dodaj',
    component: NewsFormComponent,
    canActivate: [AuthGuardService, AdminGuardService],
    data: {title: 'Napisz aktualność'}
  },
  {
    path: 'o-mnie',
    component: AboutusComponent,
    data: {title: 'O mnie'}
  },
  {
    path: 'kontakt',
    component: ContactComponent,
    data: {title: 'Kontakt'}
  },
  {
    path: 'pomoc',
    component: HelpComponent,
    data: {title: 'Pomoc'}
  },
  {
    path: 'rejestracja',
    component: RegisterEmailComponent,
    data: {title: 'Rejestracja'}
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {title: 'Error'}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // Error: Cannot match any routes. URL Segment: 'undefined'
  // https://stackoverflow.com/a/47649334
  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      this.router.navigate(['404']); // or redirect to default route
    };
  }
}
