import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {FooterService} from './services/footer.service';
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ],
  exports: [
    FooterComponent
  ],
  providers: [
    FooterService
  ]
})

export class FooterModule {}
