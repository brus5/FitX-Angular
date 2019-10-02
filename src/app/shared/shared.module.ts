import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule, MatSelectModule, MatProgressBarModule, MatToolbarModule, MatProgressSpinnerModule, MatTooltipModule, MatCheckboxModule, MatRadioModule} from '@angular/material';
import {SelectModule} from 'ng2-select';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {ClipboardModule} from 'ngx-clipboard';
import {DataTableModule} from "angular5-data-table";
import {PaginationModule} from 'ngx-bootstrap/pagination';

import {AdsenseTopComponent} from './components/adsense-top/adsense-top.component';
import {ResponsiveComponent} from './components/responsive/responsive.component';
import {DropdownListComponent} from './components/dropdown-list/dropdown-list.component';
import {CalendarComponent} from './components/calendar/calendar.component';
import {ProgressSpinnerComponent} from './components/progress-spinner/progress-spinner.component';
import {CaloriesCalculatorComponent} from './components/calories-calculator/calories-calculator.component';
import {TitleComponent} from './components/title/title.component';
import {DescriptionComponent} from './components/description/description.component';

import {FilterProductPipe} from './pipes/filterProduct.pipe';

import {MinValueDirectiveDirective} from './directives/min-value-directive.directive';
import {MaxValueDirectiveDirective} from './directives/max-value-directive.directive';

import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {ImageUploadService} from './services/image-upload.service';
import {HoursService} from './services/hours.service';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AdsenseTopComponent,
    ResponsiveComponent,
    DropdownListComponent,
    CalendarComponent,
    ProgressSpinnerComponent,
    CaloriesCalculatorComponent,
    TitleComponent,
    DescriptionComponent,

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
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    SelectModule,
    DataTableModule,
    PaginationModule,
    RouterModule,
    ClipboardModule,

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
    CaloriesCalculatorComponent,
    TitleComponent,
    DescriptionComponent,

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
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatCardModule,
    SelectModule,
    DataTableModule,
    PaginationModule,
    ClipboardModule
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
