import {NgModule} from '@angular/core';

import {AboutusComponent} from './components/aboutus/aboutus.component';

import {SharedModule} from '../shared/shared.module';
import {FooterModule} from '../footer/footer.module';

@NgModule({
  declarations: [
  AboutusComponent
  ],
  imports: [
    SharedModule,
    FooterModule
  ],
  exports: [],
})

export class AboutusModule {}
