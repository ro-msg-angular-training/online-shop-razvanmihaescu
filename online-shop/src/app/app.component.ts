import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '.msg Shop';

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      // this.router.navigateByUrl('/login');
    }
  }
}
