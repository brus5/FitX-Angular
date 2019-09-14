import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {DietModule} from './diet/diet.module';
import {ProductModule} from './product/product.module';
import {AdminModule} from './admin/admin.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CoreModule,
    SharedModule,
    HomeModule,
    UserModule,
    DietModule,
    ProductModule,
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [AppComponent]
})

export class AppModule {}
