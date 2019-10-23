import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import {DietService} from '../../services/diet.service';
import 'rxjs/add/operator/mergeMap';
import {Product} from '../../../shared/models/product';
import {HoursService} from '../../../shared/services/hours.service';
import {MealTime} from '../../../shared/models/meal-time';
import {SeoService} from '../../../shared/services/seo-service';

@Component({
  selector: 'diet',
  templateUrl: './diet.component.html',
  styleUrls: ['./diet.component.scss']
})
export class DietComponent implements OnInit, OnDestroy {

  public isHandset$: Observable<boolean>;
  mealsTime: MealTime[] = [];
  selectedDate!: string;
  isDirty: boolean;
  isLoading: boolean;

  private customHoursSubscription: Subscription = new Subscription();
  private isDirtySubscription: Subscription = new Subscription();
  private usersHoursSubscription: Subscription = new Subscription();
  private dirtyHoursSubscription: Subscription = new Subscription();

  constructor(private _navService: NavService,
              private _dietService: DietService,
              private _mealsHoursService: HoursService,
              private _seo: SeoService) {}

  ngOnInit() {
    this.isHandset$ = this._navService.isHandset$;
    this._seo.init('diet.component');
  }

  ngOnDestroy() {
    this.customHoursSubscription.unsubscribe();
    this.isDirtySubscription.unsubscribe();
    this.usersHoursSubscription.unsubscribe();
    this.dirtyHoursSubscription.unsubscribe();
    this._seo.disconnect();
  }

  async onSelectedDate(date: string) {
    this.selectedDate = date;
    this.isLoading = true;

    this.isDirtySubscription = await this._mealsHoursService.isDirty(date)
      .subscribe(dirty => this.isDirty = dirty);

    this.usersHoursSubscription = await this._mealsHoursService.getUserHours
      .first()
      .finally(() => this.subscribeCustomHours())
      .subscribe(userHours => this.mealsTime = userHours);
  }

  private async subscribeCustomHours(): Promise<Subscription> {
    return this._mealsHoursService.getCustomHours(this.selectedDate)
      .first()
      .finally(() => this.subscribeDirtyHours())
      .subscribe(customHours => {
        if (customHours) {
          this.mealsTime = customHours;
          this._mealsHoursService.removeDirtydHours(this.selectedDate);
        }
      });
  }

  private subscribeDirtyHours(): Subscription {
    return this.dirtyHoursSubscription = this._mealsHoursService.getDirtydHours(this.selectedDate)
      .subscribe(dirtyHours => {
        if (dirtyHours)
          this.mealsTime = dirtyHours;
        this.isLoading = false; // finished loading in process
      });
  }

  get dietTitle() {
    return 'Dieta';
  }

  get description() {
    return '<b>Dieta jest fundamentem naszego życia</b>. Jedni ją prowadzą lepiej lub gorzej, jednak ' +
      'każdy ją prowadzi żywiąc się różnymi pokarmami. Twoje ciało potrzebuje energii z jedzenia i ' +
      'nieustannie zużywa ją podczas działania w każdej intensywności. Podtrzymane muszą być ' +
      'podstawowe funkcje życiowe organizmu takie jak oddychanie, pompowanie krwi, trawienie. ' +
      'Energia z żywności przekształcana jest albo na fizyczną energię albo w postaci tłuszczu, białka i ' +
      'węglowodanów. Przechowywana energia pozostaje w zapasach dopóki jej nie zużyjesz, najczęściej ' +
      'są to zapasy tłuszczu. Jeżeli jednak zdecydujesz się inaczej zmuszając organizm do wysiłku, najpierw ' +
      'zacznie korzystać z bieżącej energii: węglowodanów, białka, a później zacznie czerpać energię z ' +
      'tłuszczu. Zwiększając aktywność fizyczną zwiększamy szanse, że nasz organizm przestanie ' +
      'magazynować duże ilości tłuszczu, bo dostarczana energia będzie wykorzystywana na bieżąco.';
  }


}
