import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit  {

  username = '';
  password = '';

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document,
              private authService: AuthService, private router: Router){}

  onLogin() {
    const loggedIn = this.authService.login(this.username, this.password);
    if (!loggedIn) {
      alert('Credenciales incorrectas. Intenta de nuevo.');
    }
  }

  ngOnInit(): void {
    
  }

  cargarScript(url: string) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = true;
    this.renderer.appendChild(this.document.body, script);
  }

  loadJsFile(url: string, async: boolean, defer: boolean) {  
    if ( url != "" ) {
      let node = document.createElement('script');  
      node.src = url;  
      node.type = 'text/javascript';  
      node.async = async;
      node.defer = defer;
      document.getElementsByTagName('head')[0].appendChild(node);  
    }
  }  
}
