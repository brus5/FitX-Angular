import {NgModule} from '@angular/core';

import {ErrorComponent} from './components/error/error.component';

import {SharedModule} from '../shared/shared.module';
import {FooterModule} from '../footer/footer.module';

@NgModule({
  declarations: [
    ErrorComponent
  ],
  imports: [
    SharedModule,
    FooterModule
  ],
  exports: [],
})

export class ErrorModule {}
