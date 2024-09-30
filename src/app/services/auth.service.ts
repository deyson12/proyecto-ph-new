import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../state/user/user';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import * as fromUserAction from '../state/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}/v1/auth/authenticate`;

  private isLoggedIn = false;

  constructor(private http: HttpClient, private readonly store: Store<AppState>) {}

  login(username: string, password: string): Observable<any> {

    const body = {
      email: username,
      password: password
    };

    return this.http.post<any>(this.url, body).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);

        this.isLoggedIn = true;

        const user: User = {
          username,
          isLoggedIn: true
        };

        this.store.dispatch(new fromUserAction.SaveAction(user));
      }),
      catchError(error => {
        this.isLoggedIn = false;
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;

    this.store.dispatch(new fromUserAction.RemoveAction());
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}