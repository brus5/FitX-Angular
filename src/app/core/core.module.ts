import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {LogoffComponent} from './components/logoff/logoff.component';

import {MainNavComponent} from './components/navigation/main-nav/main-nav.component';
import {ProfileNavComponent} from './components/navigation/profile-nav/profile-nav.component';
import {GoogleButtonComponent} from './components/google-button/google-button.component';
import {GoogleEmailComponent} from './components/google-email/google-email.component';
import {RegisterEmailComponent} from './components/register-email/register-email.component';

import {NavService} from './components/services/nav.service';
@NgModule({
  declarations: [
    LoginComponent,
    LogoffComponent,

    ProfileNavComponent,
    MainNavComponent,
    GoogleButtonComponent,
    GoogleEmailComponent,
    RegisterEmailComponent
  ],
  imports: [
    SharedModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    RouterModule.forChild([])
  ],
  exports: [
    MainNavComponent,
    ProfileNavComponent,
    GoogleButtonComponent,
    GoogleEmailComponent,
    RegisterEmailComponent
  ],
  providers: [
    NavService
  ]
})

export class CoreModule {}
