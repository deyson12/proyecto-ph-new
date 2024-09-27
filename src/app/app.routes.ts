import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
    {
      path: '',
      canActivate: [authGuard],
      component: LayoutComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent }
      ]
    },
    { path: '**', redirectTo: '/login' } // Redirige a home si la ruta no existe
  ];