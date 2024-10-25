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

  constructor(private http: HttpClient, private readonly store: Store<AppState>) {}

  login(username: string, password: string, tenant: string): Observable<any> {

    const body = {
      email: username,
      password,
      tenant
    };

    return this.http.post<any>(this.url, body).pipe(
      catchError(error => {
        return throwError(() => new Error('Something bad happened; please try again later.', error));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(new fromUserAction.RemoveAction());
  }

}