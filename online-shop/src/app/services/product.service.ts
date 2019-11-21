import {Injectable} from '@angular/core';
import {Product} from '../models/Product';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {OrderInput} from '../models/OrderInput';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  addProduct(body: Product) {
    return this.httpClient.post<Product>('http://localhost:3000/products', body);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<any>('http://localhost:3000/products');
  }

  getProductById(searchedId): Observable<Product> {
    return this.httpClient.get<Product>('http://localhost:3000/products/' + searchedId);
  }

  deleteProduct(id): Observable<Product> {
    return this.httpClient.delete<Product>('http://localhost:3000/products/' + id);
  }

  editProduct(product: Product, id): Observable<Product> {
    return this.httpClient.put<Product>('http://localhost:3000/products/' + id, product);
  }
}
