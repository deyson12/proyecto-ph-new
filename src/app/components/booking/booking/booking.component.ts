import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { ScriptLoaderService } from '../../../services/script-loader.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  constructor(private scriptLoaderService: ScriptLoaderService) {}

  ngOnInit(): void {
    this.scriptLoaderService.cargarScript('assets/vendor/libs/fullcalendar/fullcalendar.js', false, false);
    this.scriptLoaderService.cargarScript('assets/vendor/libs/@form-validation/umd/bundle/popular.min.js', false, false);
    this.scriptLoaderService.cargarScript('assets/vendor/libs/@form-validation/umd/plugin-bootstrap5/index.min.js', false, false);
    this.scriptLoaderService.cargarScript('assets/vendor/libs/@form-validation/umd/plugin-auto-focus/index.min.js', false, false);
    this.scriptLoaderService.cargarScript('assets/vendor/libs/select2/select2.js', false, false);
    this.scriptLoaderService.cargarScript('assets/vendor/libs/flatpickr/flatpickr.js', false, false);
    this.scriptLoaderService.cargarScript('assets/vendor/libs/moment/moment.js', false, false);

    this.scriptLoaderService.cargarScript('assets/js/app-calendar-events.js', false, false);
    this.scriptLoaderService.cargarScript('assets/js/app-calendar.js', false, false);
  }
  
}
