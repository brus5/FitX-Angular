import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  Config = {
    TITLE: 'Kontakt'
  };

  constructor() { }

  ngOnInit() {
  }

  get description() {
    return '<address class="text text-center">\n' +
      'Masz pytania? Zapraszam do kontaktu <a href="mailto:krawczak.lukasz@gmail.com">krawczak.lukasz@gmail.com</a><br> \n' +
      '<a href="https://eKcal.pl">eKcal.pl</a><br>\n' +
      '</address>';
  }

}
