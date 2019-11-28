import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private router: Router, private location: Location) {
  }

  goingToProductList() {
    this.router.navigate(['/products']);
  }

  goingBack() {
    this.location.back();
  }
}
