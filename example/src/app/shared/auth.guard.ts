// * Base
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import { inject, Injectable } from '@angular/core';

// * RxJS
import { Observable } from 'rxjs';

// * Service
import AuthService from '../service/auth.service';

Injectable();
export default class AuthGuard implements CanActivate {
  // * Injects
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.auth.isAuthentificated()) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigateByUrl('/admin/login');
      return false;
    }
  }
}
