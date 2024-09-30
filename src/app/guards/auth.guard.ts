import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  //const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    if (decodedToken.exp && decodedToken.exp > currentTime) {
      return true; // Token válido
    } else {
      localStorage.removeItem('token'); // Si el token expiró, lo eliminamos
    }
  }
  router.navigate(['/login']);
  return false;
};