import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  Config = {
    TITLE: 'O nas'
  };

  constructor() { }

  ngOnInit() {
  }

}
