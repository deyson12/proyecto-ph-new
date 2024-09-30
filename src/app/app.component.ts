import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ScriptLoaderService } from './services/script-loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  username = '';
  password = '';

  constructor(private authService: AuthService){}

  onLogin() {
    const loggedIn = this.authService.login(this.username, this.password);
    if (!loggedIn) {
      alert('Credenciales incorrectas. Intenta de nuevo.');
    }
  }
}
