import {NgModule} from '@angular/core';


import {SharedModule} from '../shared/shared.module';
import {FooterModule} from '../footer/footer.module';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  declarations: [
  HelpComponent
  ],
  imports: [
    SharedModule,
    FooterModule
  ],
  exports: [],
})

export class HelpModule {}
