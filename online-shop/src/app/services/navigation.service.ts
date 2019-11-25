import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router) { }

  goingHome() {
    this.router.navigate(['']);
  }

  goingToProductList() {
    this.router.navigate(['/products']);
  }
}