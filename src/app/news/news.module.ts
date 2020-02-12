import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {FooterModule} from '../footer/footer.module';
import {NewsComponent} from './components/news/news.component';
import {NewsTileComponent} from './components/news-tile/news-tile.component';
import {NewsBigTileComponent} from './components/news-big-tile/news-big-tile.component';
import {NewsService} from './services/news.service';
import {NewsFormComponent} from './components/news-form/news-form.component';
import {NewsReadMoreComponent} from './components/news-read-more/news-read-more.component';
import {NewsArchiveComponent} from './components/news-archive/news-archive.component';
import {AuthGuardService} from '../shared/services/auth-guard.service';
import {AdminGuardService} from '../shared/services/admin-guard.service';
import {CoreModule} from '../core/core.module';

@NgModule({
  declarations: [
    NewsComponent,
    NewsTileComponent,
    NewsBigTileComponent,
    NewsFormComponent,
    NewsReadMoreComponent,
    NewsArchiveComponent,
  ],
  imports: [
    SharedModule,
    FooterModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'aktualnosci/nowy',
        component: NewsFormComponent,
        canActivate: [AuthGuardService, AdminGuardService],
        data: {title: 'Nowa aktualność'}
      },
      {
        path: 'aktualnosci/edycja/:id',
        component: NewsFormComponent,
        canActivate: [AuthGuardService, AdminGuardService],
        data: {title: 'Edytuj aktualność'}
      },
      {
        path: 'aktualnosci/:title/:id',
        component: NewsReadMoreComponent,
        data: {title: 'Aktualność'}
      },
    ])
  ],
  exports: [
    NewsComponent,
    NewsFormComponent,
    NewsArchiveComponent
  ],
  providers: [
    NewsService
  ]
})

export class NewsModule {}
