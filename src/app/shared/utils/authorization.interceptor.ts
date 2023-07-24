import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../core/services/auth.service";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  token?: string;

  constructor(private auth: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.auth.getAuthorizationToken();
    if(this.token) {
      const authorizedRequest = request.clone({
        setHeaders: {
          Authorization: `${this.token}`
        }
      });
      return next.handle(authorizedRequest);
    }

    return next.handle(request);
  }
}
