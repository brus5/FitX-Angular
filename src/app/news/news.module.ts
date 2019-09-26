import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NewsComponent} from './components/news/news.component';
import {NewsTileComponent} from './components/news-tile/news-tile.component';
import {NewsBigTileComponent} from './components/news-big-tile/news-big-tile.component';
import {NewsService} from './services/news.service';



@NgModule({
  declarations: [
    NewsComponent,
    NewsTileComponent,
    NewsBigTileComponent,
  ],
  imports: [
    SharedModule,

    RouterModule.forChild([])
  ],
  exports: [
    NewsComponent
  ],
  providers: [
    NewsService
  ]
})

export class NewsModule {}
