import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '.msg Shop';
  badgeMustBeHidden: boolean;


  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    }
  }

  getNumberOfProductsInCart() {
    let value = localStorage.getItem('productsInCart');
    if (value === '0') {
      this.badgeMustBeHidden = true;
      return null;
    } else {
      this.badgeMustBeHidden = false;
      return value;
    }
  }
}
