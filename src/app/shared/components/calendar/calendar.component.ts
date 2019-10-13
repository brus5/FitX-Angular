import {Component, EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {NgbCalendar, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

const CALENDAR_VALUES = {
  pl: {
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
export class CalendarComponent implements OnInit {

  @Output() public date = new EventEmitter<string>();
  public model: NgbDateStruct;

  constructor(private _calendar: NgbCalendar) {}

  ngOnInit() {
    this.model = this._calendar.getToday();
    this.selectedDate();
  }

  public selectedDate() {
    this.date.emit(
      this.model.year +
      '-' + this.month +
      '-' + this.day);
  }

  public selectToday() {
    this.model = this._calendar.getToday();
  }

  private get month() {
    if (this.model.month.toString().length === 1)
      return '0' + this.model.month;
    else
      return this.model.month.toString();
  }

  private get day() {
    if (this.model.day.toString().length === 1)
      return '0' + this.model.day;
    else
      return this.model.day.toString();
  }
}
