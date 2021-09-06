import { AuthService } from './auth.service';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Retrieve token from auth service.
    const authToken = this.authService.getToken();

    // Manipulate the request to hold that token.
    // Clone request to avoid directly editing
    // outgoing request to avoid unwanted behavior.

    const authRequest = req.clone({
      // Name of the header should be the same as in the backend
      // (check-auth.js) - Authorization
      headers: req.headers.set('Authorization', 'Bearer ' + authToken),
    });

    return next.handle(authRequest);
  }
}
