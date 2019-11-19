import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { Credentials } from 'src/app/models/Credentials';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup:FormGroup;
  credentials:Credentials;

  constructor(private authService:AuthService,private router: Router) { }

  ngOnInit() {
    this.formGroup=new FormGroup({
      user:new FormControl("",Validators.required),
      pass:new FormControl("",Validators.required)
    });
    this.credentials={
      username:"",
      password:""
    };
  }

  onClickSubmit(formData)
  {
    this.credentials.username=formData.user;
    this.credentials.password=formData.pass;

    this.authService.login(this.credentials).subscribe( ()=>{this.router.navigateByUrl('/products');} );
  }
}
