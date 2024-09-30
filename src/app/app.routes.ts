import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { EmptyComponent } from './components/empty/empty/empty.component';
import { Booking2Component } from './components/booking2/booking2/booking2.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige al login por defecto
    {
      path: '',
      canActivate: [authGuard],
      component: LayoutComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'booking', component: BookingComponent },
        { path: 'booking2', component: Booking2Component },
        { path: 'empty', component: EmptyComponent },
      ]
    },
    { path: '**', redirectTo: '/login' } // Redirige a home si la ruta no existe
  ];