import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  Config = {
    TITLE: 'O mnie',
    IMAGE: 'assets/author.jpg'
  };

  constructor() { }

  ngOnInit() {
  }

  get description() {
    return 'Nazywam się Łukasz Krawczak i jestem założycielem tego serwisu. ' +
      'Tworząc tę aplikację chciałem zachęcić ludzi do zdrowszego odżywiania' +
      ' się i chęci prowadzenia diety z eKcal.pl. Mam nadzieję, że osiągniesz ' +
      'swoje cele, bez względu na to, czy chcesz poprawić swój wygląd, czy czuć ' +
      'się lepiej. Jeżeli masz jeszcze jakieś pomysły, jak ulepszyć aplikację ' +
      'zapraszam do działu Kontakt';
  }

}
