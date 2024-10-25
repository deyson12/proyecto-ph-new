import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.reducer';
import { Unit } from '../../../state/unit/unit';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  unit: Unit = {
    unit: '',
    logo: '',
    name: '',
    tenant: ''
  };

  constructor(private router: Router, private readonly state: Store<AppState>,) {
    this.state.select('unit').subscribe( unit => {
      this.unit = unit;
    });
  }

  backToLogin(): void {
    this.router.navigate([this.unit.unit]); // Navega a la URL especificada
  }
}
