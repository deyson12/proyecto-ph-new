import { Injectable } from '@angular/core';
import { Unit } from '../state/unit/unit';
import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  private url = `${environment.apiUrl}/v1/unit`;

  private unitRoutes: Routes = [];

  private readonly unitMap: Map<string, Unit> = new Map<string, Unit>();

  private unitMapReady: Promise<void>;

  constructor(private http: HttpClient) {
    this.unitMapReady = this.http.get<Unit[]>(this.url).pipe(
      tap((units: Unit[]) => {
        units.forEach(unit => {
          const key = unit.unit;
          this.unitMap.set(key, unit);
          this.unitRoutes.push({ path: key, component: LoginComponent })
        });
      }),
      catchError(error => {
        return throwError(() => new Error('Something bad happened; please try again later.', error));
      })
    ).toPromise().then(() => { });
  }

  getRutas(): Observable<any> {
    return this.unitRoutes.length ? of(this.unitRoutes) : of([]);
  }

  async loadUnitRoutes(): Promise<Routes> {
    return this.unitMapReady.then(() => {
      return this.unitRoutes.length ? this.unitRoutes : [];
    });
  }

  async getUnit(key: string): Promise<Unit> {
    return this.unitMapReady.then(() => {
      return this.unitMap.get(key) ?? this.getDefaultUnit();
    });
  }

  getUnitMap(): Map<string, Unit> {
    return this.unitMap;
  }


  getDefaultUnit(): Unit {
    // Retorna una instancia de Unit predeterminada
    let unit: Unit = {
      unit: '',
      logo: '',
      tenant: '',
      name: ''
    }
    return unit;
  }
}