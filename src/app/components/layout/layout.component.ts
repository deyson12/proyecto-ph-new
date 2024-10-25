import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../state/user/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { AuthService } from '../../services/auth.service';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { userInitialState } from '../../state/user/user.reducer';
import { Unit } from '../../state/unit/unit';
import { unitInitialState } from '../../state/unit/unit.reducer';

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

  constructor(private scriptLoaderService: ScriptLoaderService, 
    private readonly state: Store<AppState>,
    private authService: AuthService,
    private router: Router
  ){
    this.state.select((state) => state).subscribe( ({ user, unit }) => {
      this.user = user;
      this.unit = unit;
    });
  }

  ngOnInit(): void {
    this.scriptLoaderService.cargarScript('assets/js/main.js', false, false);
  }

  onLogout(): void {
    this.router.navigate(['/'+this.unit.unit]);
    this.authService.logout();
  }

}
