import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {AppUser} from '../../../shared/models/app-user';
import * as firebase from 'firebase';
import {AuthService} from '../../../shared/services/auth.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public isHandset$: Observable<boolean>;

  user = {} as AppUser;
  firebaseUser = {} as firebase.User;

  somatotypes = ['Ectomorfik', 'Mezomorfik', 'Endomorfik'];

  choosedSomatotype: string;
  selectError: boolean;

  private appUserSubscription: Subscription = new Subscription();

  constructor(private _navService: NavService,
              private _auth: AuthService) {
  }

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
    this.appUserSubscription = this._auth.appUser$.subscribe(user => {
      this.firebaseUser = user;
      this.user.name = this.firebaseUser.displayName;
    });
  }

  ngOnDestroy() {
    this.appUserSubscription.unsubscribe();
  }

  getSomatotypes(): Observable<string[]> {
    return Observable.of(this.somatotypes);
  }

  onSomatotypeChoosed(somatotyope: string) {
    this.choosedSomatotype = somatotyope;
    console.log(somatotyope);
  }

  handleError($event: boolean) {
    this.selectError = $event;
  }
}
