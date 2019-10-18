import {NgModule} from '@angular/core';

import {ProductsComponent} from './components/products/products.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {ProductComponent} from './components/product/product.component';
import {ProductNutritionComponent} from './components/product-nutrition/product-nutrition.component';

import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {FooterModule} from '../footer/footer.module';

import {ProductService} from './services/product.service';
import {AuthGuardService} from '../shared/services/auth-guard.service';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent,
    ProductComponent,
    ProductNutritionComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FooterModule,
    RouterModule.forChild([
      {
        path: 'produkty/nowy',
        component: ProductFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Nowy produkt',
          description: 'Dodaj produkt do bazy danych.',
          ogUrl: 'your og url'
        }
      },
      {
        path: 'produkty/edycja/:id',
        component: ProductFormComponent,
        canActivate: [AuthGuardService],
        data: {
          title: 'Edytuj produkt',
          description: 'Edytuj produkt.',
          ogUrl: 'your og url'
        }
      }
    ])
  ],
  exports: [],
  providers: [
    ProductService
  ]
})

export class ProductModule {}
