import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'diet-custom-hours',
  templateUrl: './diet-custom-hours.component.html',
  styleUrls: ['./diet-custom-hours.component.scss']
})
export class DietCustomHoursComponent implements OnInit {

  @Input('date') date: string;

  constructor() { }

  ngOnInit() {
  }

}
