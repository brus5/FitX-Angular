import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import "rxjs/add/operator/first";
import "rxjs/add/operator/finally";
import {AppUser} from '../../../shared/models/app-user';
import {Somatotype} from '../../../shared/models/somatotype';
import {DropdownListComponent} from '../../../shared/components/dropdown-list/dropdown-list.component';
import {NavService} from '../../../core/components/services/nav.service';
import {AuthService} from '../../../shared/services/auth.service';
import {SomatotypesService} from '../../../shared/services/somatotypes.service';
import {UserService} from '../../../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild('dropdownListComponent', {static: false}) private dropdownListComponent: DropdownListComponent;
  public isHandset$: Observable<boolean>;

  appUser$ = {} as AppUser;
  userId: string;

  somatotypes: Array<Somatotype> = [];
  somatotypes$;
  choosedSomatotype: string;
  selectError: boolean;

  private somatotypeSubscription: Subscription = new Subscription();
  private userAuthSubscription: Subscription = new Subscription();
  private appUserSubscription: Subscription = new Subscription();

  constructor(private _navService: NavService,
              private _auth: AuthService,
              private _somatotypeService: SomatotypesService,
              private _userService: UserService,
              private _toastrService: ToastrService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;

    this._somatotypeService.getAll()
      .first()
      .finally(() => this.subscribeAppUser())
      .subscribe(somatotypes => this.subscribeSomatotype(somatotypes));

    this.userAuthSubscription = this._auth.appUser$
      .subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.appUserSubscription.unsubscribe();
    this.somatotypeSubscription.unsubscribe();
    this.userAuthSubscription.unsubscribe();
  }

  onAccept() {
    this._userService.update(this.appUser$)
      .then(() => this._toastrService.success('Zaktualizowano'));
  }

  getSomatotypes(): Observable<string[]> {
    let array = Array.from(this.somatotypes).map(value => value.name);
    return Observable.of(array);
  }

  onSomatotypeSelected(type: string) {
    this.choosedSomatotype = type;
  }

  handleError($event: boolean) {
    this.selectError = $event;
  }

  private fetchAppUser(appUser: AppUser) {
    this.appUser$ = appUser;
    this.appUser$.uid = this.userId;
    this.dropdownListComponent.select(this.appUser$.somatotype);
    // this.adjustSomatotype(appUser.somatotype);
    // TODO zrobic dobieranie wartości
  }

  private adjustSomatotype(somatotype: string) {
    console.log(somatotype);
  }

  get nutrientsAmount() {
    return this.appUser$.maxProteins + this.appUser$.maxCarbs + this.appUser$.maxFats;
  }

  get areNutrientsValid(): boolean {
    return this.nutrientsAmount > 100 || this.nutrientsAmount < 100;
  }


  private subscribeAppUser(): Subscription {
    return this.appUserSubscription = this._auth.appUser$$
      .subscribe(appUser => this.fetchAppUser(appUser));
  }

  private subscribeSomatotype(somatotypes) {
    this.somatotypes$ = somatotypes;
    this.somatotypes$.map((somatotype: Somatotype) => this.somatotypes.push(somatotype));
  }
}
