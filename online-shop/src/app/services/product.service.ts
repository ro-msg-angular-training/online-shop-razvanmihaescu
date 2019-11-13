import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { ActivatedRoute ,Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private router: Router, private httpClient: HttpClient) { }

  goingHome()
  {
  this.router.navigate(['']);
  }

  getProducts() : Observable<Product[]> 
  {
    return this.httpClient.get<any>('http://localhost:3000/products');
  }

  getProductById(searchedId) : Observable<Product>
  {
    return this.httpClient.get<Product>('http://localhost:3000/products/'+searchedId);
  }

  deleteProduct(id) : Observable<Product>
  {
    return this.httpClient.delete<Product>('http://localhost:3000/products/'+id);
  }

  editProduct(product:Product, id): Observable<Product>
  {
    return this.httpClient.put<Product>('http://localhost:3000/products/'+id,product);
  }

  addOrder(customer:string, products:Product[])
  {
    return this.httpClient.post<any>('http://localhost:3000/orders','a');//currently working on it, don't use this method pls
  }
}
