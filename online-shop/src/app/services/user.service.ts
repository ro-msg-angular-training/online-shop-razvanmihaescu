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

  updateUserCart(username, cart: Cart[]) {
    return this.httpClient.patch('http://localhost:3000/users/' + username, {cart: cart});
  }
}
