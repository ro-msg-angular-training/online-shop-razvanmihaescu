import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Credentials} from 'src/app/models/Credentials';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {NavigationService} from '../../services/navigation.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  credentials: Credentials;
  currentUser: User;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.authService.isLoggedIn = false;
    this.formGroup = new FormGroup({
      user: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });
    this.credentials = {
      username: '',
      password: ''
    };
  }

  onClickSubmit(formData) {
    this.credentials.username = formData.user;
    this.credentials.password = formData.pass;

    this.authService.login(this.credentials).subscribe(response => {
      localStorage.setItem('tokenType', response.tokenType);
      localStorage.setItem('tokenValue', response.accessToken);
      this.authService.isLoggedIn = true;
      this.userService.getCurrentUserInfos(localStorage.getItem('username')).subscribe(user => {
        this.currentUser = user;
        localStorage.setItem('roles', user.roles.toString());
        this.userService.updateCurrentNumberOfProducts();
      });
      this.navigationService.goingToProductList();
    });
  }
}
