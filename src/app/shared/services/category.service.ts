import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _db: AngularFireDatabase) {}

  getAll() {
    return this._db.list('/categories',
      category => category.orderByChild('name')).valueChanges();
  }
}
