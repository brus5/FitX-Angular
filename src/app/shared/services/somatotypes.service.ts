import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SomatotypesService {

  constructor(private _db: AngularFireDatabase) { }

  getAll() {
    return this._db.list('/somatotypes',
      somatotype => somatotype.orderByChild('value')).valueChanges();
  }
}
