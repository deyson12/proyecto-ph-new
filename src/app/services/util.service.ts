import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  private url = `${environment.apiUrl}/v1/healthcheck`;

  constructor(private http: HttpClient) { }

  test(): Observable<any> {
    return this.http.get(this.url, { responseType: 'text' }).pipe(
      catchError(error => {
        console.log(error);
        return throwError(() => new Error('Error en el Healthcheck', error));
      })
    );
  }
}