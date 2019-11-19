import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Credentials} from 'src/app/models/Credentials';
import {Router} from '@angular/router';
import {User} from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  credentials: Credentials;
  currentUser: User;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
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
      this.currentUser = response;
      this.authService.isLoggedIn = true;
      this.router.navigateByUrl('/products');
    });
  }
}
