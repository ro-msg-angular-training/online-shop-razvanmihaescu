import {Injectable} from '@angular/core';
import {OrderInput} from '../models/OrderInput';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  selectedProducts: Product[] = [];

  constructor(private httpClient: HttpClient) {
  }

  getSelectedProducts() {
    return this.selectedProducts;
  }

  addOrder(order: OrderInput) {
    return this.httpClient.post<any>('http://localhost:3000/orders', order); // currently working on it, don't use this method pls
  }
}
