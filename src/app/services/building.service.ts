import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  private url = `${environment.apiUrl}/v1/building`;

  constructor(private http: HttpClient) { }

  getOwners(): Observable<any> {
    return this.http.get(this.url).pipe(
      catchError(error => {
        return throwError(() => new Error('Error obteniendo los buldings', error));
      })
    );
  }
}
