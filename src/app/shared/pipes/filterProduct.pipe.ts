import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../models/product';

@Pipe({
  name: 'filterProduct'
})
export class FilterProductPipe implements PipeTransform {

  transform(products: Product[], searchProduct: string): Product[] {
    if (!products) return [];
    if (!searchProduct) return products;

    searchProduct = searchProduct.toLowerCase();

    return products.filter((product: Product) => {
      return product.name.toLowerCase().includes(searchProduct);
    });
  }
}
