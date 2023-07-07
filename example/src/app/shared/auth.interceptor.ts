// * Base
import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

// * RxJS
import { catchError, Observable, throwError } from 'rxjs';

// * Service
import AuthService from '../service/auth.service';

Injectable();
export default class AuthInterceptor implements HttpInterceptor {
  // * Injects
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthentificated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('Interceptor', error);
        if (error.status === 401) {
          this.auth.logout();
          this.router.navigate(['/admin', 'login']);
        }
        return throwError(error);
      })
    );
  }
}
