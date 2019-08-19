import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'diet-add-product',
  templateUrl: './diet-add-product.component.html',
  styleUrls: ['./diet-add-product.component.scss']
})
export class DietAddProductComponent implements OnInit {

  constructor(private _productService: ProductService) {
  }

  async ngOnInit() {
// TODO: `zrobić wyszukiwanie
    await this._productService.getByName('ku')
      .subscribe(products => {
        console.log(products);
      });
  }

}
