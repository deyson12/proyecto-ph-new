import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  // Simula la posición de la otra persona
  getOtherPosition(): Observable<{ latitude: number; longitude: number }> {
    return of({
      latitude: 6.2442, // Ejemplo de coordenadas
      longitude: -75.5812,
    });
  }
}