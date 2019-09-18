import {NgModule} from '@angular/core';

import {HomeComponent} from './components/home/home.component';

import {SharedModule} from '../shared/shared.module';
import {FooterModule} from '../footer/footer.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    SharedModule,
    FooterModule
  ],
  exports: []
})

export class HomeModule {}
