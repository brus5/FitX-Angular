import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatSelectModule, MatProgressBarModule} from '@angular/material';
import {SelectModule} from 'ng2-select';
import {RouterModule} from '@angular/router';

import {HomeComponent} from './components/home/home.component';
import {DietComponent} from './components/diet/diet.component';
import {ProductsComponent} from './components/products/products.component';
import {ProductFormComponent} from './components/product-form/product-form.component';
import {ProductComponent} from './components/product/product.component';

import {AdsenseTopComponent} from './components/adsense-top/adsense-top.component';
import {ResponsiveComponent} from './components/responsive/responsive.component';
import {ErrorComponent} from './components/error/error.component';
import {DropdownListComponent} from './components/dropdown-list/dropdown-list.component';
import {CalendarComponent} from './components/horizontal-calendar/calendar.component';

import {FilterProductPipe} from './pipes/filterProduct.pipe';

import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {ImageUploadService} from './services/image-upload.service';

@NgModule({
  declarations: [
    HomeComponent,
    DietComponent,
    ProductsComponent,
    ProductFormComponent,

    AdsenseTopComponent,
    ResponsiveComponent,
    ErrorComponent,
    DropdownListComponent,
    ProductComponent,
    CalendarComponent,

    FilterProductPipe,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    SelectModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: 'products/new',
        component: ProductFormComponent
      },
      {
        path: 'products/edit/:id',
        component: ProductFormComponent
      }
    ]),
  ],
  exports: [
    AdsenseTopComponent,
    ResponsiveComponent,
    ProductFormComponent,
    ErrorComponent,
    DropdownListComponent,
    ProductComponent,
    CalendarComponent,

    FilterProductPipe,

    CommonModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    SelectModule
  ],
  providers: [
    UserService,
    AuthService,
    ImageUploadService
  ]
})

export class SharedModule {
}
