import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<HttpEvent<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginUrl = '/Login';
    debugger
    if (!req.url.includes(loginUrl)) {
      const tokenType = localStorage.getItem('tokenType');
      const tokenValue = localStorage.getItem('tokenValue');
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `${tokenType}${tokenValue}`),
      });
      return next.handle(modifiedReq);
    } else {
      return next.handle(req);
    }
  }
}
