import {NgModule} from '@angular/core';

import {HomeComponent} from './components/home/home.component';
import {BannerMainComponent} from './components/banner-main/banner-main.component';
import {NewsComponent} from './components/news/news.component';

import {SharedModule} from '../shared/shared.module';
import {FooterModule} from '../footer/footer.module';
import { NewsTileComponent } from './components/news-tile/news-tile.component';
import { NewsBigTileComponent } from './components/news-big-tile/news-big-tile.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerMainComponent,
    NewsComponent,
    NewsTileComponent,
    NewsBigTileComponent
  ],
  imports: [
    SharedModule,
    FooterModule
  ],
  exports: []
})

export class HomeModule {}
