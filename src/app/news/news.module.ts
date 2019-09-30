import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {NewsComponent} from './components/news/news.component';
import {NewsTileComponent} from './components/news-tile/news-tile.component';
import {NewsBigTileComponent} from './components/news-big-tile/news-big-tile.component';
import {NewsService} from './services/news.service';
import {NewsFormComponent} from './components/news-form/news-form.component';
import {NewsReadMoreComponent} from './components/news-read-more/news-read-more.component';
import {AuthGuardService} from '../shared/services/auth-guard.service';
import {AdminGuardService} from '../shared/services/admin-guard.service';

@NgModule({
  declarations: [
    NewsComponent,
    NewsTileComponent,
    NewsBigTileComponent,
    NewsFormComponent,
    NewsReadMoreComponent,
  ],
  imports: [
    SharedModule,

    RouterModule.forChild([
      {
        path: 'aktualnosci/nowy',
        component: NewsFormComponent,
        canActivate: [AuthGuardService, AdminGuardService],
        data: {
          title: 'Nowa aktualność',
          description: 'Napisz nowego newsa do portalu.',
          ogUrl: 'your og url'
        }
      },
      {
        path: 'aktualnosci/edycja/:id',
        component: NewsFormComponent,
        canActivate: [AuthGuardService, AdminGuardService],
        data: {
          title: 'Edytuj aktualność',
          description: 'Edytuj newsa.',
          ogUrl: 'your og url'
        }
      },
      {
        path: 'aktualnosci/:title/:id',
        component: NewsReadMoreComponent,
        data: {
          title: 'Aktualność',
          description: 'News.',
          ogUrl: 'your og url'
        }
      },
    ])
  ],
  exports: [
    NewsComponent,
    NewsFormComponent
  ],
  providers: [
    NewsService
  ]
})

export class NewsModule {}
