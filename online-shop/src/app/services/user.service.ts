import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Cart} from '../models/OrderInput';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  ENDPOINT = 'http://localhost:8080/Users/';

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUserInfos(username) {
    return this.httpClient.get<User>(this.ENDPOINT + username);
  }

  updateCurrentNumberOfProducts() {
    this.httpClient.get<User>(this.ENDPOINT + localStorage.getItem('username')).subscribe(a => {
      let value = 0;
      a.cart.forEach(b => value += b.quantity);
      localStorage.setItem('numberOfProductsInCart', value.toString());
    });
  }

  updateUserCart(username, cart: Cart[]) {
    return this.httpClient.patch(this.ENDPOINT + username, {cart: cart});
  }
}
