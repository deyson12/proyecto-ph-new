import { CUSTOM_ELEMENTS_SCHEMA, isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router'; // Importa el RouterModule
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { structure } from './app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TokenInterceptor } from './interceptor/interceptor.service';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { Booking2Component } from './components/booking2/booking2/booking2.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Booking2Component,
    BookingComponent
  ],
  imports: [
    BrowserModule,
    FullCalendarModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideStore(structure), 
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() , connectInZone: true}),
    provideHttpClient(withInterceptors([TokenInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
