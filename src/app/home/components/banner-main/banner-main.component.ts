import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {NavService} from '../../../core/components/services/nav.service';
import AOS from 'aos';

@Component({
  selector: 'banner-main',
  templateUrl: './banner-main.component.html',
  styleUrls: ['./banner-main.component.scss']
})
export class BannerMainComponent implements OnInit {

  public isHandset$: Observable<boolean>;

  imageSources = [
    'assets/slideshow/slide-1.png',
    'assets/slideshow/slide-2.png',
  ];

  constructor(private _navService: NavService) { }

  ngOnInit() {
    AOS.init({
      disable: 'mobile',
      offset: 0,
      once: true,
    });
    this.isHandset$ = this._navService.isHandset$;
  }

}
