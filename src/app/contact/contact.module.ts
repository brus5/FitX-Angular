import {NgModule} from '@angular/core';

import {ContactComponent} from './components/contact/contact.component';

import {SharedModule} from '../shared/shared.module';
import {FooterModule} from '../footer/footer.module';

@NgModule({
  declarations: [
  ContactComponent
  ],
  imports: [
    SharedModule,
    FooterModule
  ],
  exports: [],
})

export class ContactModule {}
