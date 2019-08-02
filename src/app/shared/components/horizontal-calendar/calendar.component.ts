import {Component, EventEmitter, Injectable, OnInit, Output, ViewChild} from '@angular/core';
import {NgbCalendar, NgbDatepicker, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const CALENDAR_VALUES = {
  'pl': {
    weekdays: ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'],
    months: ['Sty', 'Lut', 'Mar', 'Kwi', 'Maj', 'Cze', 'Lip', 'Sie', 'Wrz', 'Paź', 'Lis', 'Gru'],
  }
};

@Injectable()
export class I18n {
  language = 'pl';
}

@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return CALENDAR_VALUES[this._i18n.language].weekdays[weekday - 1];
  }

  getMonthShortName(month: number): string {
    return CALENDAR_VALUES[this._i18n.language].months[month - 1];
  }

  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [I18n, {provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n}]
})
export class CalendarComponent implements OnInit{

  @Output('date') public _date = new EventEmitter<string>();
  public _model: NgbDateStruct;

  constructor(private _calendar: NgbCalendar) {}

  ngOnInit() {
    this._model = this._calendar.getToday();
    this.selectedDate();
  }

  public selectedDate() {
    this._date.emit(
      this._model.year +
      '-' + this._model.month +
      '-' + this._model.day);
  }

  public selectToday() {
    this._model = this._calendar.getToday();
  }
}
