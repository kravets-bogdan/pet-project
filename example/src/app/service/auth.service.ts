// * Base
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// * RxJS
import { tap } from 'rxjs';

// * Types
import { IAutorizationRequestData, IAutorizationResponse } from '../types/user';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  // * Injects
  private readonly http = inject(HttpClient);

  get token(): string {
    const expDate = new Date(localStorage.getItem('expiresIn')!);
    if (new Date() > expDate) {
      this.logout();
    }
    return localStorage.getItem('token')!;
  }

  login(data: IAutorizationRequestData) {
    return this.http
      .post<IAutorizationResponse>(
        `http://localhost:3000/api/users/authorization`,
        data
      )
      .pipe(tap(this.setToken));
  }

  logout() {
    this.setToken(null);
  }

  isAuthentificated(): boolean {
    return !!this.token;
  }

  private setToken(response: IAutorizationResponse | null) {
    if (response) {
      const expDate = new Date(
        new Date().getTime() + +response.data.expiresIn * 1000
      );
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('expiresIn', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}
