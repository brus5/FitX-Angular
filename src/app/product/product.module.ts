import {NgModule} from '@angular/core';

import {ProductsComponent} from './components/products/products.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {ProductComponent} from './components/product/product.component';
import {ProductsWaitingRoomComponent} from './components/products-waiting-room/products-waiting-room.component';

import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

import {ProductService} from './services/product.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    ProductComponent,
    ProductsWaitingRoomComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'products/new',
        component: ProductFormComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductFormComponent
      }
    ])
  ],
  exports: [],
  providers: [
    ProductService
  ]
})

export class ProductModule {}
