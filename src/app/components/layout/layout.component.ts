import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { User } from '../../state/user/user';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import { ScriptLoaderService } from '../../services/script-loader.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  suscription: Subscription;

  user: User = {
    username: '',
    isLoggedIn: false
  };

  constructor(private scriptLoaderService: ScriptLoaderService, 
    private readonly state: Store<AppState>,
    private authService: AuthService
  ){

    this.suscription = this.state.select('user').subscribe( user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.scriptLoaderService.cargarScript('assets/js/main.js', false, false);
  }

  onLogout(): void {
    this.authService.logout();
  }

}
