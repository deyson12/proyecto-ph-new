import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError, first, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Unit } from '../domain/unit';
import { routes } from '../app.routes';

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router); 
  const state = inject(Store<AppState>);

  const token = localStorage.getItem('token');

  return state.select('unit').pipe(
    first(),
    switchMap((unit: Unit) => {

      if (!req.url.endsWith('/authenticate') && !req.url.endsWith('/unit') && !req.url.endsWith('/healthcheck')) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            unitId: unit.id
          }
        });
      }

      if (req.url.endsWith('/authenticate')) {
        req = req.clone({
          setHeaders: {
            unitId: unit.id
          }
        });
      }
      
      return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 || error.status === 403) {
            console.log('Error Interceptor');
            router.navigate(['/' + unit.login]);
          }

          if (error.status === 0) {
            routes.forEach(route => {
              router.config.push(route);
            });

            router.resetConfig(router.config);

            console.error('Backend NO responde: ', router.config);

            router.navigate(['/error']);
          }

          return throwError(() => error);
        })
      );
    })
  );
};
