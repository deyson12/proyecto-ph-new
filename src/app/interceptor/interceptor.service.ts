import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const TokenInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router); // Usamos inject para obtener el servicio de Router en una función

  const token = localStorage.getItem('token');

  if (!req.url.endsWith('/authenticate')) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      
      console.log("Captura error: ", error)

      if (error.status === 401 || error.status === 403) {
        // Redirige al usuario al login cuando el token haya expirado
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};