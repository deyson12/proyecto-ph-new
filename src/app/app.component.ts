import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UnitService } from './services/unit.service';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private unitService: UnitService, private router: Router) { }

  ngOnInit() {
    this.cargarRutasDinamicas();
  }

  cargarRutasDinamicas() {
    this.unitService.getRutas().subscribe(
      (rutas) => {
        rutas.forEach((ruta: any) => {
          this.router.config.push({
            path: ruta.path,
            component: ruta.component
          });
        });
        routes.forEach(route => {
          this.router.config.push(route);
        });
      },
      (error) => {
        routes.forEach(route => {
          this.router.config.push(route);
        });
      }
    );
  }  

}
