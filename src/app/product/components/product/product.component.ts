import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input() public product: Product;

  constructor() { }

  ngOnInit() {
  }

}
