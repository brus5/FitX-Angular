import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  Config = {
    TITLE: 'Pomoc'
  };

  constructor() { }

  ngOnInit() {
  }

  get description() {
    return 'Jeżeli czujesz się zagubiony i potrzebujesz wskazówek co do' +
      ' diety, bądź nie wiesz od czego zacząc, zapraszam do kontaktu ' +
      '<a href="mailto:krawczak.lukasz@gmail.com">krawczak.lukasz@gmail.com</a>';
  }

}
