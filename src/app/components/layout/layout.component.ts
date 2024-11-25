import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../domain/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { userInitialState } from '../../state/user/user.reducer';
import { Unit } from '../../domain/unit';
import { unitInitialState } from '../../state/unit/unit.reducer';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  user: User = userInitialState;
  unit: Unit = unitInitialState;

  rutas: any[] = [];

  constructor(private scriptLoaderService: ScriptLoaderService, 
    private readonly state: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ){
    this.state.select((state) => state).subscribe( ({ user, unit }) => {
      this.user = user;
      this.unit = unit;
      this.setFavicon(unit.logo);
    });
  }

  setFavicon(url: string) {
    const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (link) {
      link.href = url;
    } else {
      const newLink: HTMLLinkElement = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = url;
      document.head.appendChild(newLink);
    }
  }

  showOption(url: string): boolean {
    return routes.some(route => 
      route.data?.['type'] === 'principal' &&
      route.children?.some(child => 
        child.path === url && 
        child.data?.['roles']?.includes(this.user.role)
      )
    );
  }

  ngOnInit(): void {
    this.scriptLoaderService.cargarScript('assets/js/main.js', false, false);
  }

  onLogout(): void {
    this.router.navigate(['/'+this.unit.login]);
    this.authService.logout();
  }

}
