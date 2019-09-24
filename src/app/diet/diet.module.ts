import {NgModule} from '@angular/core';

import {DietComponent} from './components/diet/diet.component';
import {DietHoursComponent} from './components/diet-hours/diet-hours.component';
import {DietAddProductComponent} from './components/diet-add-product/diet-add-product.component';
import {DietBarComponent} from './components/diet-bar/diet-bar.component';
import {DietCustomHoursComponent} from './components/diet-custom-hours/diet-custom-hours.component';

import {SharedModule} from '../shared/shared.module';
import {DietService} from './services/diet.service';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    DietComponent,
    DietHoursComponent,
    DietAddProductComponent,
    DietBarComponent,
    DietCustomHoursComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'godziny-posilkow/edycja/:date',
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
