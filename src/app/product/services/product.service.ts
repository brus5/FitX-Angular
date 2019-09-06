import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Product} from '../../shared/models/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _db: AngularFireDatabase) {}

  public getAll(): Observable<Product[]> {
    return this._db.list('/products')
      .snapshotChanges().pipe(
        map(actions =>
          actions.map(action => (
            {key: action.payload.key, ...action.payload.val() as Product}))
        )
      );
  }

  public getProduct(productId: string): Observable<Product> {
    return this._db.object<Product>('/products/' + productId).valueChanges();
  }

  public update(productId: string, product: Product) {
    return this._db.object<Product>('/products/' + productId).update(product);
  }

  public create(product: Product) {
    return this._db.list('/products').push(product);
  }

  public remove(product: string) {
    return this._db.list<Product>('/products/' + product).remove();
  }

  public getProductByName(productPhrase: string): Observable<Product[]> {
    return this._db.list('/products',
      ref => ref.orderByChild('/name')
        .startAt(productPhrase)
        // '\uf88f' has very high code point in the Unicode range. It is after most regular chars in Unicode.
        .endAt(productPhrase + '\uf88f'))
      .snapshotChanges().pipe(
        map(actions =>
          actions.map(action => (
            {key: action.payload.key, ...action.payload.val() as Product}))
        ));
  }
}