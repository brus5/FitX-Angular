import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'product-card-waiting',
  templateUrl: './product-card-waiting.component.html',
  styleUrls: ['./product-card-waiting.component.scss']
})
export class ProductCardWaitingComponent implements OnInit {

  @Input('product') product: Product;

  constructor() { }

  ngOnInit() {
  }

}
