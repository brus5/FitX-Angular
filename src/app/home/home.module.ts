import {NgModule} from '@angular/core';

import {HomeComponent} from './components/home/home.component';

import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule
  ],
  exports: []
})

export class HomeModule {}
