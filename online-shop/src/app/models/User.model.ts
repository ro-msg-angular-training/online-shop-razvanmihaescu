import {Cart} from './OrderInput.model';
import {Roles} from './Roles.model';

export interface User {
  username: string;
  fullName: string;
  roles: Roles[]; // example: List [ "user", "customer", "admin" ]
  cart: Cart[];
}
