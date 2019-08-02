import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './shared/services/auth.service';
import {UserService} from './shared/services/user.service';
import {NAV_LINKS} from './core/components/navigation/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = NAV_LINKS;

  constructor(private _userService: UserService,
              private _auth: AuthService,
              private _router: Router) {
    _auth.user$.subscribe(user => {
        if (!user) return;

        _userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if (!returnUrl) return;

        localStorage.removeItem('returnUrl');
        _router.navigateByUrl('/');
      }
    );
  }
}
