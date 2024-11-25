import { Component } from '@angular/core';
import { GeolocationService } from '../../services/geolocation.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  myPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  otherPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit(): void {
    // Obtener la posición inicial
    navigator.geolocation.getCurrentPosition((position) => {
      this.myPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.center = this.myPosition;
    });

    // Actualizar la posición en tiempo real
    interval(5000).subscribe(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        this.myPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });

      // Supongamos que `getOtherPosition()` obtiene la posición de otra persona
      this.geolocationService.getOtherPosition().subscribe((position) => {
        this.otherPosition = {
          lat: position.latitude,
          lng: position.longitude,
        };
      });
    });
  }

}
