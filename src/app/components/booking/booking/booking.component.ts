import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../../services/script-loader.service';
import { CalendarOptions, EventClickArg } from '@fullcalendar/core';
import dayGrid from '@fullcalendar/daygrid';
import interaction, { DateClickArg } from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'
import timegrid from '@fullcalendar/timegrid'
import multiMonth from '@fullcalendar/multimonth'
import esLocale from '@fullcalendar/core/locales/es';
import { Event } from '../../../domain/event';
import { EventService } from '../../../services/event.service';

declare var bootstrap: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {

  event: Event = {
    title: '',
    startDate: ''
  };

  loadingEvents = true;

  calendarOptions: CalendarOptions = {};

  constructor(private scriptLoaderService: ScriptLoaderService, private eventService: EventService) { }

  ngOnInit(): void {
    this.loadCalendarOptions();
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe({
      next: (response) => {
        this.calendarOptions.events = response;
        this.loadingEvents = false;
        this.scriptLoaderService.cargarScript('assets/js/app-calendar2.js', false, false);
      },
      error: (error) => {
        console.error('Error eventos:', error);
        this.loadingEvents = false;
        this.scriptLoaderService.cargarScript('assets/js/app-calendar2.js', false, false);
      }
    });
  }

  loadCalendarOptions() {

    let calendarsColor: any = {
      piscina: 'primary',
      zonaDeJuegos: 'success',
      cancha: 'danger',
      salonSocial: 'warning',
      gimnasio: 'info'
    };

    this.calendarOptions = {
      plugins: [dayGrid, interaction, listPlugin, timegrid, multiMonth],
      initialView: 'dayGridMonth',
      locale: esLocale,
      dayMaxEvents: 2,
      editable: false,
      dragScroll: true,
      initialDate: new Date(),
      navLinks: true,
      weekends: true,
      dateClick: this.handleDateClick.bind(this),
      eventClassNames: function ({ event: calendarEvent }) {
        const extendedProps = calendarEvent._def.extendedProps as any;
        const colorName = calendarsColor[extendedProps.calendar];
        return ['fc-event-' + colorName];
      },
      eventClick: this.eventClick.bind(this),
      events: [],
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function() {
            alert('clicked the custom button!');
          }
        }
      },
      headerToolbar: {
        start: 'myCustomButton prev next',
        center: 'title',
        end: 'today,dayGridMonth,timeGridWeek,timeGridDay,listMonth,multiMonthYear'
      }, // Para agregar fuiltro por mes, semana, dia 
    }
  }

  addEvent() {
    const newEvent = {
      title: 'Hola',
      start: '2024-11-02',
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
    this.event.title = '';
    this.event.startDate = '';

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
    this.event.title = title;
    this.event.startDate = dateStr;

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

}
