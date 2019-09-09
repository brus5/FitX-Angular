import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatSelectModule, MatProgressBarModule, MatToolbarModule, MatProgressSpinnerModule} from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {SelectModule} from 'ng2-select';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';

import {AdsenseTopComponent} from './components/adsense-top/adsense-top.component';
import {ResponsiveComponent} from './components/responsive/responsive.component';
import {DropdownListComponent} from './components/dropdown-list/dropdown-list.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component';

import {FilterProductPipe} from './pipes/filterProduct.pipe';

import {MinValueDirectiveDirective} from './directives/min-value-directive.directive';
import {MaxValueDirectiveDirective} from './directives/max-value-directive.directive';

import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {ImageUploadService} from './services/image-upload.service';
import {MealHoursService} from './services/meals-hours.service';

@NgModule({
  declarations: [
    AdsenseTopComponent,
    ResponsiveComponent,
    DropdownListComponent,
    CalendarComponent,
    ProgressSpinnerComponent,

    FilterProductPipe,

    MinValueDirectiveDirective,
    MaxValueDirectiveDirective
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
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    SelectModule,
    RouterModule,

    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  exports: [
    AdsenseTopComponent,
    ResponsiveComponent,
    DropdownListComponent,
    CalendarComponent,
    ProgressSpinnerComponent,

    FilterProductPipe,

    MinValueDirectiveDirective,
    MaxValueDirectiveDirective,

    CommonModule,
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    SelectModule,
  ],
  providers: [
    UserService,
    AuthService,
    ImageUploadService,
    MealHoursService
  ]
})

export class SharedModule {
}
