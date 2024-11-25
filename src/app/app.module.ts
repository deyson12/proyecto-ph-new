import { APP_INITIALIZER, isDevMode, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { structure } from './app.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TokenInterceptor } from './interceptor/interceptor.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BookingComponent } from './components/booking/booking/booking.component';
import { localStorageSync } from 'ngrx-store-localstorage';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UnitService } from './services/unit.service';
import { MapComponent } from './components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { DataTablesModule } from 'angular-datatables';
import { OwnerComponent } from './components/owner/owner.component';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['user', 'unit'], rehydrate: true })(reducer);
}

export function loadDynamicRoutes(unitService: UnitService) {
  return async () => await unitService.loadUnitRoutes();  // Cambiado a función async
}

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    MapComponent,
    OwnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FullCalendarModule,
    GoogleMapsModule,
    DataTablesModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot(structure, {
      metaReducers: [localStorageSyncReducer], 
    }),
  ],
  providers: [
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() , connectInZone: true}),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: loadDynamicRoutes,
      deps: [UnitService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
