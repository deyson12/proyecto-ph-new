import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Unit } from '../../domain/unit';
import { UnitService } from '../../services/unit.service';
import { User } from '../../domain/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import * as fromUserAction from '../../state/user/user.actions';
import * as fromUnitAction from '../../state/unit/unit.actions';
import { Token } from '../../domain/token';

import { jwtDecode } from "jwt-decode";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  unit: Unit;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute,
    private unitService: UnitService,
    private readonly store: Store<AppState>,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,) {
      this.unit = {
        id: '',
        logo: '',
        name: '',
        login: '',
        style: ''
      }
    }

    async ngOnInit(): Promise<void> {
      this.route.url.subscribe(async urlSegment => {
        const unit = await this.unitService.getUnit(urlSegment.map(segment => segment.path).join('/'));

        this.unit = {
          id: unit.id,
          logo: unit.logo,
          name: unit.name,
          login: unit.login,
          style: unit.style
        };

        this.setFavicon(unit.logo);
    
        this.store.dispatch(new fromUnitAction.SaveAction(this.unit));
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

  onLogin() {
    this.authService.login(this.username, this.password, this.unit.id).subscribe({
      next: (response) => {

        localStorage.setItem('token', response.token);

        let token: Token = this.getDecodedToken(response.token);

        const user: User = {
          username: this.username,
          isLoggedIn: true,
          role: token.role || 'NA'
        };

        this.store.dispatch(new fromUserAction.SaveAction(user));

        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.onToastButtonClick();
        this.router.navigate(['/'+this.unit.login]);
      }
    });
  }

  getDecodedToken(token: string): Token {
    try {
      return jwtDecode<Token>(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return {};
    }
  }

  onToastButtonClick(): void {
    const toastAnimationExample = document.querySelector('.toast-ex') as HTMLDivElement;
    let toastAnimation: any;

    toastAnimationExample.classList.add('bg-danger', 'animate__fade');
    toastAnimation = new (window as any).bootstrap.Toast(toastAnimationExample);
    toastAnimation.show();

  }

}
