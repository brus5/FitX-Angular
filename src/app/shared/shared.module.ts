import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {ThirdPartyModule} from './third.party.module';

import {HttpClientModule} from '@angular/common/http';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AdsenseTopComponent} from './components/adsense-top/adsense-top.component';
import {ResponsiveComponent} from './components/responsive/responsive.component';
import {DropdownListComponent} from './components/dropdown-list/dropdown-list.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component';
import {TitleComponent} from './components/title/title.component';
import {DescriptionComponent} from './components/description/description.component';

import {FilterProductPipe} from './pipes/filterProduct.pipe';

import {MinValueDirectiveDirective} from './directives/min-value-directive.directive';
import {MaxValueDirectiveDirective} from './directives/max-value-directive.directive';

import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {ImageUploadService} from './services/image-upload.service';
import {HoursService} from './services/hours.service';

@NgModule({
  declarations: [
    AdsenseTopComponent,
    ResponsiveComponent,
    DropdownListComponent,
    CalendarComponent,
    ProgressSpinnerComponent,
    TitleComponent,
    DescriptionComponent,

    FilterProductPipe,

    MinValueDirectiveDirective,
    MaxValueDirectiveDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ThirdPartyModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdsenseTopComponent,
    ResponsiveComponent,
    DropdownListComponent,
    CalendarComponent,
    ProgressSpinnerComponent,
    TitleComponent,
    DescriptionComponent,

    FilterProductPipe,

    MinValueDirectiveDirective,
    MaxValueDirectiveDirective,

    CommonModule,
    MaterialModule,
    ThirdPartyModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
  ],
  providers: [
    UserService,
    AuthService,
    ImageUploadService,
    HoursService
  ]
})

export class SharedModule {
}
