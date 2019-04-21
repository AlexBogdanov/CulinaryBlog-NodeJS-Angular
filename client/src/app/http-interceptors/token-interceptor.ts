import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { UserService } from './../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(public userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `JWT ${this.userService.getItem('token')}`
      }
    });

    return next.handle(request);
  }
}