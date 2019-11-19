import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Credentials} from '../models/Credentials';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/User';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  login(credentials: Credentials): Observable<User> {
    return this.httpClient.post<any>('http://localhost:3000/login', credentials).pipe(catchError(this.handleError));
    this.isLoggedIn = true;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.status.valueOf() === 401) {
        errorMessage = 'username or password is incorrect';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    window.alert(errorMessage);
    window.location.reload();
    return throwError(errorMessage);
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
