import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Cart} from '../models/OrderInput';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  getCurrentUserInfos(username) {
    return this.httpClient.get<User>('http://localhost:3000/users/' + username);
  }

  updateCurrentNumberOfProducts() {
    this.httpClient.get<User>('http://localhost:3000/users/' + localStorage.getItem('username')).subscribe(a => {
      let value = 0;
      a.cart.forEach(b => value += b.quantity);
      localStorage.setItem('numberOfProductsInCart', value.toString());
    });
  }

  updateUserCart(username, cart: Cart[]) {
    return this.httpClient.patch('http://localhost:3000/users/' + username, {cart: cart});
  }
}
