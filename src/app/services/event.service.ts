import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = `${environment.apiUrl}/v1/event`;

  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get(this.url).pipe(
      catchError(error => {
        return throwError(() => new Error('Error obteniendo los eventos', error));
      })
    );
  }
}
