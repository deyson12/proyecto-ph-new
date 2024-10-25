import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGrid from '@fullcalendar/daygrid';
import interaction, { DateClickArg } from '@fullcalendar/interaction';
import { aR } from '@fullcalendar/core/internal-common';
declare var bootstrap: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  
  constructor(private scriptLoaderService: ScriptLoaderService) { }

  date = new Date();
  newEvents: any = [];

  eventTitle: String = "";
  eventStartDate: String = "";

  calendarOptions: CalendarOptions = {};

  loadCalendarOptions() {

    let calendarsColor: any = {
      piscina: 'primary',
      zonaDeJuegos: 'success',
      cancha: 'danger',
      salonSocial: 'warning',
      gimnasio: 'info'
    };

    this.calendarOptions = {
      plugins: [dayGrid, interaction],
      initialView: 'dayGridMonth',
      locale: 'es',
      dayMaxEvents: 2,
       editable: true, // Para permitir mover
      dragScroll: true,
      /*customButtons: {
        sidebarToggle: {
          text: 'Calendario Zonas Comunes'
        }
      },*/ // Botones personalizados
      headerToolbar: {
        start: 'sidebarToggle, sidebarToggle2, prev,next, title',
        end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      }, // Para agregar fuiltro por mes, semana, dia 
      initialDate: new Date(),
      navLinks: true,
      dateClick: this.handleDateClick.bind(this),
      eventClassNames: function ({ event: calendarEvent }) {
        const extendedProps = calendarEvent._def.extendedProps as any;
        const colorName = calendarsColor[extendedProps.calendar];
        return ['fc-event-' + colorName];
      },
      eventClick: this.eventClick.bind(this),
      events: [
        { 
          id: "1",
          title: '3:00 PM - 524 (3 personas)', 
          start: '2024-10-28',
          interactive: true,
          extendedProps: {
            calendar: 'piscina'
          }
        },
        {
          id: "2",
          title: 'Dart Game?',
          start: '2024-10-01',
          extendedProps: {
            calendar: 'zonaDeJuegos'
          }
        },
        {
          id: "3",
          title: 'Festivo',
          start: '2024-10-26',
          extendedProps: {
            calendar: 'cancha'
          }
        },
        {
          id: "3",
          title: 'Festivo',
          start: '2024-10-20',
          extendedProps: {
            calendar: 'salonSocial'
          }
        }
      ]
    }
  }

  addEvent() {
    const newEvent = { 
      title: 'Hola',
      start: '2024-10-02', 
      extendedProps: {
        calendar: 'salonSocial'
      }
    };
  
    const existingEvents = Array.isArray(this.calendarOptions.events) ? this.calendarOptions.events : [];
  
    this.calendarOptions.events = [...existingEvents, newEvent];

    let addEventSidebar = document.getElementById('addEventSidebar') as HTMLDivElement;
    const bsAddEventSidebar = new bootstrap.Offcanvas(addEventSidebar);
    bsAddEventSidebar.hide();
  }

  cleanFields() {
    this.eventTitle = '';
    this.eventStartDate = '';

    let btnSubmit = document.querySelector('#addEvent') as HTMLButtonElement;
    let btnDeleteEvent = document.querySelector('.btn-delete-event') as HTMLButtonElement;

    btnSubmit.innerHTML = 'Reservar';
    btnSubmit.classList.remove('btn-update-event');
    btnSubmit.classList.add('btn-add-event');
    btnDeleteEvent.classList.add('d-none');
  }

  fillFieldsAndOpen(title: string, dateStr: string) {

    this.cleanFields();

    let addEventSidebar = document.getElementById('addEventSidebar') as HTMLDivElement;
    const bsAddEventSidebar = new bootstrap.Offcanvas(addEventSidebar);
    this.eventTitle = title;
    this.eventStartDate = dateStr;

    bsAddEventSidebar.show();
  }

  addNewEvent() {
    this.cleanFields();
  }

  handleDateClick(args: DateClickArg) {
    this.fillFieldsAndOpen('', args.dateStr);
  }

  eventClick(info: EventClickArg) {

    this.fillFieldsAndOpen(info.event._def.title, info.event.startStr);

    let btnSubmit = document.querySelector('#addEvent') as HTMLButtonElement;
    let btnDeleteEvent = document.querySelector('.btn-delete-event') as HTMLButtonElement;

    btnSubmit.innerHTML = 'Update';
    btnSubmit.classList.add('btn-update-event');
    btnSubmit.classList.remove('btn-add-event');
    btnDeleteEvent.classList.remove('d-none');
  }

  ngOnInit(): void {

    this.loadCalendarOptions();

    this.scriptLoaderService.cargarScript('assets/js/app-calendar2.js', false, false);
  }

}
