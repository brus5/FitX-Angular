import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import { DietOptionsComponent } from './components/diet-options/diet-options.component';

@NgModule({
  declarations: [
  DietOptionsComponent
  ],
  imports: [
    SharedModule
  ],
  exports: [
    DietOptionsComponent
  ],
})

export class UserModule {}
