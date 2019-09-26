import {NgModule} from '@angular/core';

import {HomeComponent} from './components/home/home.component';
import {BannerMainComponent} from './components/banner-main/banner-main.component';

import {SharedModule} from '../shared/shared.module';
import {NewsModule} from '../news/news.module';
import {FooterModule} from '../footer/footer.module';

@NgModule({
  declarations: [
    HomeComponent,
    BannerMainComponent,
  ],
  imports: [
    SharedModule,
    NewsModule,
    FooterModule
  ],
  exports: []
})

export class HomeModule {}
