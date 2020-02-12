import {Component, OnInit} from '@angular/core';
import {AppUser} from '../../../../shared/models/app-user';
import {AuthService} from '../../../../shared/services/auth.service';
import {ADMIN_LINKS, PROFILE_LINKS} from '../menu';
import {Observable} from 'rxjs';
import {NavService} from '../../services/nav.service';

@Component({
  selector: 'profile-nav',
  templateUrl: './profile-nav.component.html',
  styleUrls: ['./profile-nav.component.scss']
})
export class ProfileNavComponent implements OnInit {

  isHandset$: Observable<boolean>;
  appUser$: AppUser;

  constructor(private _auth: AuthService,
              private _navService: NavService) {
  }

  ngOnInit() {
    this._auth.appUser$$.subscribe(appUser => {
      this.appUser$ = appUser;
    });
    this.isHandset$ = this._navService.isHandset$;
  }

  get profileLinks() {
    return PROFILE_LINKS;
  }

  get adminLinks() {
    return ADMIN_LINKS;
  }

  shortUserEmail(email: string) {
    return email.substr(0, email.indexOf("@"));
  }
}
