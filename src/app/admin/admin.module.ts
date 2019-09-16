import {NgModule} from '@angular/core';

import {ProductsWaitingRoomComponent} from './components/products-waiting-room/products-waiting-room.component';
import {ProductCardWaitingComponent} from './components/product-card-waiting/product-card-waiting.component';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ProductsWaitingRoomComponent,
    ProductCardWaitingComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
  ],
})

export class AdminModule {}
