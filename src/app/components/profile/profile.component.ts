import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(private utilService: UtilService) {}

  ngOnInit(): void {
    this.utilService.test().subscribe({
      next: (response) => {
        console.log('API Healthcheck OK:', response);
      },
      error: (error) => {
        console.error('Healthcheck fallido:', error);
      }
    });
  }

}
