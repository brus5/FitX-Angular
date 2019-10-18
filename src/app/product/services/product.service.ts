import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Product} from '../../shared/models/product';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private isLoading = true;

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

  public getAllWaitingRoom(): Observable<Product[]> {
    return this._db.list('/products-waiting-room')
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

  public create(product: Product, isAdmin: boolean) {
    if (isAdmin) return this._db.list('/products').push(product);
    else return this._db.list('/products-waiting-room').push(product);
  }

  public copy(product: Product) {
    return this._db.object('/products/' + product.key).set(product);
  }

  public remove(productId: string) {
    return this._db.list<Product>('/products/' + productId).remove();
  }

  public removeFromWaitingRoom(productId: string) {
    return this._db.list<Product>('/products-waiting-room/' + productId).remove();
  }

  public getProductByName(productPhrase: string): Observable<Product[]> {
    return this._db.list('/products',
      ref => ref.orderByChild('/name')
        .limitToFirst(10)
        .startAt(productPhrase)
        // '\uf88f' has very high code point in the Unicode range. It is after most regular chars in Unicode.
        .endAt(productPhrase + '\uf88f'))
      .snapshotChanges().pipe(
        map(actions =>
          actions.map(action => (
            {key: action.payload.key, ...action.payload.val() as Product}))
        ));
  }

  public set loading(loading: boolean) {
    this.isLoading = loading;
  }

  public get loading(): boolean {
    return this.isLoading;
  }
}
