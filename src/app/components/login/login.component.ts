import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Unit } from '../../state/unit/unit';
import { UnitService } from '../../services/unit.service';
import { User } from '../../state/user/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import * as fromUserAction from '../../state/user/user.actions';
import * as fromUnitAction from '../../state/unit/unit.actions';

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
    private readonly store: Store<AppState>) {
      this.unit = {
        unit: '',
        logo: '',
        name: '',
        tenant: ''
      }
    }

    async ngOnInit(): Promise<void> {
      this.route.url.subscribe(async urlSegment => {
        const unit = await this.unitService.getUnit(urlSegment.map(segment => segment.path).join('/'));

        this.unit = {
          unit: unit.unit,
          logo: unit.logo,
          name: unit.name,
          tenant: unit.tenant
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
    this.authService.login(this.username, this.password, this.unit.tenant).subscribe({
      next: (response) => {

        localStorage.setItem('token', response.token);

        const user: User = {
          username: this.username,
          isLoggedIn: true,
        };

        this.store.dispatch(new fromUserAction.SaveAction(user));

        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.onToastButtonClick();
        this.router.navigate(['/'+this.unit.unit]);
      }
    });
  }

  onToastButtonClick(): void {
    const toastAnimationExample = document.querySelector('.toast-ex') as HTMLDivElement;
    let toastAnimation: any;

    toastAnimationExample.classList.add('bg-danger', 'animate__fade');
    toastAnimation = new (window as any).bootstrap.Toast(toastAnimationExample);
    toastAnimation.show();

  }

}
