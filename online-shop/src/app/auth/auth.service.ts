import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Credentials} from '../models/Credentials';
import {Observable, throwError} from 'rxjs';
import {JWToken} from '../models/JWToken';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  API_URL = 'http://localhost:8080/Login';

  constructor(private httpClient: HttpClient) {
  }

  login(credentials: Credentials): Observable<JWToken> {
    localStorage.setItem('username', credentials.username);
    return this.httpClient.post<any>(this.API_URL, credentials).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage: string;
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

  isAuthenticated() {
    return this.isLoggedIn;
  }

  getRoles(): string {
    return localStorage.getItem('roles').toString();
  }
}
