import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) { }

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.onToastButtonClick();
        console.error('Healthcheck fallido:', error);
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
