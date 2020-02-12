import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AuthService} from './shared/services/auth.service';
import {UserService} from './shared/services/user.service';
import {NAV_LINKS} from './core/components/navigation/menu';
import {Meta, Title} from '@angular/platform-browser';
import {SeoService} from './shared/services/seo-service';
import {filter, map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = NAV_LINKS;

  constructor(private _userService: UserService,
              private _auth: AuthService,
              private _router: Router,
              private _titleService: Title,
              private _meta: Meta,
              private _seoService: SeoService,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.initRouterHolder();
    this.initAppUser();
  }

  private initRouterHolder() {
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data)
    )
      .subscribe((event) => {
        this._seoService.updateTitle(event['title']);
      });
  }

  private initAppUser() {
    this._auth.user$.subscribe(user => {
        if (!user) return;

        this._userService.save(user);

        const returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) return;

        localStorage.removeItem('returnUrl');
        this._router.navigateByUrl('/');
      }
    );
  }
}

