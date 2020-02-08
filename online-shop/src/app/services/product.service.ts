import {Injectable} from '@angular/core';
import {Product} from '../models/Product';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  ENDPOINT = 'http://localhost:8080/Products/';

  constructor(private httpClient: HttpClient) {
  }

  addProduct(body: Product) {
    return this.httpClient.post<Product>(this.ENDPOINT, body);
  }

  getProducts(): Observable<Product[]> {
    return this.httpClient.get<any>(this.ENDPOINT);
  }

  getProductById(searchedId): Observable<Product> {
    return this.httpClient.get<Product>(this.ENDPOINT + searchedId);
  }

  deleteProduct(id): Observable<Product> {
    return this.httpClient.delete<Product>(this.ENDPOINT + id);
  }

  editProduct(product: Product, id): Observable<Product> {
    return this.httpClient.put<Product>(this.ENDPOINT + id, product);
  }
}
