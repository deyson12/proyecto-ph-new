import { isDevMode, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; // Importa el RouterModule
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { structure } from './app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TokenInterceptor } from './interceptor/interceptor.service';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { Booking2Component } from './components/booking2/booking2/booking2.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { localStorageSync } from 'ngrx-store-localstorage';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['user'], rehydrate: true })(reducer);
}

@NgModule({
  declarations: [
    AppComponent,
    Booking2Component,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(structure, {
      metaReducers: [localStorageSyncReducer], // Sincroniza el estado del store con localStorage
    }),
  ],
  providers: [
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() , connectInZone: true}),
    provideHttpClient(withInterceptors([TokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
