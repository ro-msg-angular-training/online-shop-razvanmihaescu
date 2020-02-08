import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<HttpEvent<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenType = localStorage.getItem('tokenType');
    const tokenValue = localStorage.getItem('tokenValue');
    const modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `${tokenType}${tokenValue}`),
    });
    return next.handle(modifiedReq);
  }
}
