import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../shared/models/product';
import {ProductService} from '../../../product/services/product.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'product-card-waiting',
  templateUrl: './product-card-waiting.component.html',
  styleUrls: ['./product-card-waiting.component.scss']
})
export class ProductCardWaitingComponent implements OnInit {

  @Input('product') product: Product;

  constructor(private _productService: ProductService,
              private _toastrService: ToastrService) { }

  ngOnInit() {
  }

  onAccept() {
    this._productService.copy(this.product)
      .then(() => this._productService.removeFromWaitingRoom(this.product.key))
      .finally(() => this._toastrService.success('Dodano'));
  }

  onDelete() {
    this._productService.removeFromWaitingRoom(this.product.key)
      .then(() => this._toastrService.success('Usunięto pomyślnie'));
  }
}
