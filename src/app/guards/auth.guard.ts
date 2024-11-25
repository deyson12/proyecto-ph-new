import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { userInitialState } from '../state/user/user.reducer';
import { User } from '../domain/user';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  let user: User = userInitialState;

  store.select('user').pipe(take(1)).subscribe((stateUser) => {
    user = stateUser;
  });

  let isValid = route.children[0].data['roles'] === undefined || route.children[0].data['roles']?.includes(user.role);

  if (!isValid){
    router.navigate(['/']);
    return false;
  }

  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp > currentTime) {
      return true;
    } else {
      localStorage.removeItem('token');
    }
  }
  router.navigate(['/']);
  return false;
};