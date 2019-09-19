import {NgModule} from '@angular/core';

import {DietComponent} from './components/diet/diet.component';
import {DietHoursComponent} from './components/diet-hours/diet-hours.component';
import {DietAddProductComponent} from './components/diet-add-product/diet-add-product.component';
import {DietMenuComponent} from './components/diet-menu/diet-menu.component';
import {DietCustomHoursComponent} from './components/diet-custom-hours/diet-custom-hours.component';

import {SharedModule} from '../shared/shared.module';
import {DietService} from './services/diet.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    DietComponent,
    DietHoursComponent,
    DietAddProductComponent,
    DietMenuComponent,
    DietCustomHoursComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'godziny-posilkow/:topMessage',
        component: DietHoursComponent
      }
    ])
  ],
  exports: [],
  providers: [
    DietService
  ]
})

export class DietModule {}
