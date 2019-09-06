import {NgModule} from '@angular/core';

import {DietComponent} from './components/diet/diet.component';
import {DietHoursComponent} from './components/diet-hours/diet-hours.component';
import {DietAddProductComponent} from './components/diet-add-product/diet-add-product.component';
import {DietMenuComponent} from './components/diet-menu/diet-menu.component';

import {SharedModule} from '../shared/shared.module';
import {DietService} from './services/diet.service';

@NgModule({
  declarations: [
    DietComponent,
    DietHoursComponent,
    DietAddProductComponent,
    DietMenuComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [],
  providers: [
    DietService
  ]
})

export class DietModule {}
