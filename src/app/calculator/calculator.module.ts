import {NgModule} from '@angular/core';

import {CaloriesCalculatorComponent} from './components/calories-calculator/calories-calculator.component';

import {SharedModule} from '../shared/shared.module';
import {FooterModule} from '../footer/footer.module';

@NgModule({
  declarations: [
    CaloriesCalculatorComponent
  ],
  imports: [
    SharedModule,
    FooterModule
  ],
  exports: [
  ],
})

export class CalculatorModule {}
