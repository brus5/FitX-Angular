import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../../product/services/product.service';
import {Subscription} from 'rxjs';
import {Product} from '../../../shared/models/product';
import {WAITING_ROOM_TITLE} from '../../../shared/components/titles';

@Component({
  selector: 'products-waiting-room',
  templateUrl: './products-waiting-room.component.html',
  styleUrls: ['./products-waiting-room.component.scss']
})
export class ProductsWaitingRoomComponent implements OnInit, OnDestroy {

  products: Product[] = [];

  private productsSubscription: Subscription;

  constructor(private _productService: ProductService) { }

  ngOnInit() {
    this.productsSubscription = this._productService.getAllWaitingRoom()
      .subscribe(products => this.products = products);
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  get waitingRoomTitle() {
    return WAITING_ROOM_TITLE;
  }

}
