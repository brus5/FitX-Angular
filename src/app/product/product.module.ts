import {NgModule} from '@angular/core';

import {ProductsComponent} from './components/products/products.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {ProductComponent} from './components/product/product.component';
import {ProductNutritionComponent} from './components/product-nutrition/product-nutrition.component';

import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

import {ProductService} from './services/product.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    ProductComponent,
    ProductNutritionComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'produkty/nowy',
        component: ProductFormComponent
      },
      {
        path: 'produkty/edycja/:id',
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
