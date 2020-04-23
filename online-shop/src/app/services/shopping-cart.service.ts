import {Injectable} from '@angular/core';
import {OrderInput} from '../models/OrderInput.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NavigationService} from './navigation.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  ENDPOINT = 'http://localhost:8080/Orders/';

  constructor(private httpClient: HttpClient) {
  }

  addOrder(order: OrderInput) {
    return this.httpClient.post<any>(this.ENDPOINT, order).pipe(catchError(this.handleError.bind(this)));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.status.valueOf() === 401) {
        errorMessage = 'user or product not found';
      } else if (error.status.valueOf() === 201) {
        errorMessage = 'successful operation';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
