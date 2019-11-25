import {Cart} from './OrderInput';

export interface User {
  username: string;
  fullName: string;
  roles: string[]; // example: List [ "user", "customer", "admin" ]
  cart: Cart[];
}
