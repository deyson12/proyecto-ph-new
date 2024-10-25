import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ScriptLoaderService } from './services/script-loader.service';
import { UnitService } from './services/unit.service';
import { HomeComponent } from './components/home/home.component';
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
    this.unitService.getRutas().subscribe((rutas) => {
      rutas.forEach((ruta: any) => {
        this.router.config.push({
          path: ruta.path,
          component: ruta.component
        });
      });
      routes.forEach(route => {
        this.router.config.push(route);
      })
    });
  }

}
