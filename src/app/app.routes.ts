import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { EmptyComponent } from './components/empty/empty/empty.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { ErrorComponent } from './components/error/error.component';
import { MapComponent } from './components/map/map.component';
import { OwnerComponent } from './components/owner/owner.component';

export const routes: Routes = [
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: '', component: NotFoundComponent, data: { roles: ['SUPER_ADMIN'] } },
    { path: 'error', component: ErrorComponent },
    {
      path: '',
      canActivate: [authGuard],
      component: LayoutComponent,
      data: { type: 'principal' },
      children: [
        { path: 'admin', component: AdminComponent, data: { roles: ['SUPER_ADMIN'] }},
        { path: 'owner', component: OwnerComponent, data: { roles: ['SUPER_ADMIN'] }},
        { path: 'home', component: HomeComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'booking', component: BookingComponent },
        { path: 'empty', component: EmptyComponent, data: { roles: ['SUPER_ADMIN'] } },
        { path: 'map', component: MapComponent},
      ]
    },
    { path: '**', component: NotFoundComponent }
  ];
  