import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { structure } from './app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TokenInterceptor } from './interceptor/interceptor.service';
import { FullCalendarModule } from '@fullcalendar/angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideHttpClient(), 
    provideStore(structure), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() , connectInZone: true}),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    importProvidersFrom(FullCalendarModule)
  ]
};
