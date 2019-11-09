import {FormsModule} from '@angular/forms';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './shared/material.module';
import {ThirdPartyModule} from './shared/third.party.module';
import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {DietModule} from './diet/diet.module';
import {ProductModule} from './product/product.module';
import {AdminModule} from './admin/admin.module';
import {FooterModule} from './footer/footer.module';
import {NewsModule} from './news/news.module';
import {CalculatorModule} from './calculator/calculator.module';
import {AboutusModule} from './aboutus/aboutus.module';
import {HelpModule} from './help/help.module';
import {ContactModule} from './contact/contact.module';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularFirestoreModule} from '@angular/fire/firestore';

import {AngularFireModule} from '@angular/fire';
import {PaginationModule} from 'ngx-bootstrap/pagination';

import {environment} from '../environments/environment';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {ErrorModule} from './error/error.module';

registerLocaleData(localePl);

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    CoreModule,
    SharedModule,
    MaterialModule,
    ThirdPartyModule,
    HomeModule,
    UserModule,
    DietModule,
    ProductModule,
    AdminModule,
    FooterModule,
    NewsModule,
    CalculatorModule,
    AboutusModule,
    HelpModule,
    ContactModule,
    ErrorModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFirestoreModule,

    AngularFireModule.initializeApp(environment.firebase),

    PaginationModule.forRoot()
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pl'}],
  bootstrap: [AppComponent]
})

export class AppModule {}
