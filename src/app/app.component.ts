import { ApplicationRef, ChangeDetectorRef, Component, Inject, NgZone, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UnitService } from './services/unit.service';
import { routes } from './app.routes';
import { DOCUMENT, Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(
    private unitService: UnitService,
    private router: Router,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private readonly state: Store<AppState>
  ) {
    this.state.select('unit').subscribe((unit) => {
      this.setTheme(unit.style)
    });

    this.paintColors();
  }

  paintColors() {

    const originalColors = ['#696cff', '#5f61e6', '#6467f2', '#595cd9', '#787bff', '#696cff29']

    originalColors.forEach(colorOriginal => {
      // Asegúrate de tener implementada la función transformColor
      const colorTransformado1 = this.transformColor(colorOriginal);

      // Mensaje con estilos aplicados para cada color
      const message = `Color Base ${colorOriginal}: %c█%c , color Transformado ${colorTransformado1}: %c█`;

      // Estilos para los colores
      const style1 = `color: ${colorOriginal};`;
      const styleNormal = `color: black;`;
      const style2 = `color: ${colorTransformado1};`;

      // Imprimir en consola con los estilos aplicados
      console.log(message, style1, styleNormal, style2);
    });

  }


  // Función para convertir un color hexadecimal en RGB
  hexToRgb(hex: string): { r: number; g: number; b: number } {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }

  // Función para convertir RGB en hexadecimal
  rgbToHex(r: number, g: number, b: number): string {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  // Función lógica para transformar el color
  transformColor(hex: string): string {
    const { r, g, b } = this.hexToRgb(hex);

    // Calcular el nuevo valor:
    const newR = 255; // Siempre el valor máximo (FF)
    const minGB = Math.min(g, b); // Mínimo entre verde y azul
    const newG = minGB; // Nuevo verde igual al mínimo
    const newB = minGB; // Nuevo azul igual al mínimo

    // Convertir el nuevo color a hexadecimal
    return this.rgbToHex(newR, newG, newB);
  }

  setTheme(newTheme: string) {

    const htmlElement = this.document.documentElement;

    this.renderer.removeAttribute(htmlElement, 'data-theme'); // Elimina temporalmente el atributo
    this.renderer.setAttribute(htmlElement, 'data-theme', newTheme); // Lo vuelve a agregar
    const linkElement = this.document.querySelector('.template-customizer-theme-css') as HTMLLinkElement;

    if (linkElement) {
      // Crear un nuevo enlace para cargar el CSS sin parpadear
      const newLinkElement = this.renderer.createElement('link') as HTMLLinkElement;
      newLinkElement.rel = 'stylesheet';
      newLinkElement.type = 'text/css';
      newLinkElement.href = `../../assets/vendor/css/rtl/${newTheme}.css`;
      newLinkElement.onload = () => {
        // Reemplaza el enlace actual una vez que el nuevo se ha cargado
        linkElement.parentNode?.replaceChild(newLinkElement, linkElement);
      };

      // Añade el nuevo enlace al DOM pero no reemplaza el antiguo aún
      this.renderer.appendChild(this.document.head, newLinkElement);
    }

  }

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
