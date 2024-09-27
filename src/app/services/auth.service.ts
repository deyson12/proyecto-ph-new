import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}/v1/auth/authenticate`;

  private isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {

    const body = {
      email: username,
      password: password
    };

    return this.http.post<any>(this.url, body).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        console.log('Token', res.token);
        this.isLoggedIn = true;

        const user: User = {
          username,
          isLoggedIn: true
        };

        this.store.dispatch(new fromUserAction.SaveAction(user));
      }),
      catchError(error => {
        console.error('Error occurred: ', error);
        this.isLoggedIn = false;
        // Aquí puedes manejar el error como prefieras
        // Por ejemplo, podrías redirigir al usuario a una página de error o mostrar un mensaje de error específico
        // Puedes también decidir re-lanzar el error si quieres que sea manejado más arriba en la cadena
        return throwError(() => new Error('Something bad happened; please try again later.'));
      })
    );

    // Aquí iría la lógica de autenticación, como una llamada a un API.
    if (username === 'admin' && password === 'admin') {

      this.isLoggedIn = true;
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}