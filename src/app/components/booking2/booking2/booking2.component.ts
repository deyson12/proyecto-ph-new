import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-booking2',
  standalone: true,
  templateUrl: './booking2.component.html',
  styleUrl: './booking2.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Booking2Component {

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: false,
    events: [
      { title: 'Meeting', start: new Date() }
    ]
  };

}
