import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';

import {LoginComponent} from './components/login/login.component';
import {LogoffComponent} from './components/logoff/logoff.component';

import {MainNavComponent} from './components/navigation/main-nav/main-nav.component';
import {ProfileNavComponent} from './components/navigation/profile-nav/profile-nav.component';

import {NavService} from './components/services/nav.service';

@NgModule({
  declarations: [
    LoginComponent,
    LogoffComponent,

    ProfileNavComponent,
    MainNavComponent
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
  ],
  providers: [
    NavService
  ]
})

export class CoreModule {}
