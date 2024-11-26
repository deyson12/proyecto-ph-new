import { Component, OnInit } from '@angular/core';
import { ScriptLoaderService } from '../../services/script-loader.service';
import { Config } from 'datatables.net';
import { OwnerService } from '../../services/owner.service';
import { BuildingService } from '../../services/building.service';
import { Building } from '../../domain/building';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrl: './owner.component.css'
})
export class OwnerComponent implements OnInit {

  dtOptions: Config = {};
  buildings: Building[] = [];

  constructor(
    private scriptLoaderService: ScriptLoaderService,
    private ownerService: OwnerService,
    private buildingService: BuildingService
  ) {
    // this.scriptLoaderService.cargarScript('assets/js/app-access-roles.js', false, false);
    // this.scriptLoaderService.cargarScript('assets/js/modal-add-role.js', false, false);
  }

  ngOnInit(): void {

    this.buildingService.getOwners().subscribe({
      next: (response) => {
        this.buildings = response;
      },
      error: (error) => {
        console.error(error);
      }
    });

    let assetsPath = 'assets/';
    let userView = '';

    this.dtOptions = {
      ajax: (dataTablesParameters: any, callback) => {
        this.ownerService.getOwners().subscribe((response) => {
          callback({
            recordsTotal: response.length,
            recordsFiltered: response.length,
            data: response
          });
        });
      },
      columns: [
        { data: 'fullName' },
        { data: 'role' },
        { data: 'contact' },
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // User full name and email
          targets: 0,
          render: function (data, type, full, meta) {
            var $name = full['fullName'],
              $email = full['email'],
              $image = full['avatar'];
            if ($image) {
              // For Avatar image
              var $output =
                '<img src="' + assetsPath + 'img/avatars/' + $image + '" alt="Avatar" class="rounded-circle">';
            } else {
              // For Avatar badge
              var stateNum = Math.floor(Math.random() * 6) + 1;
              var states = ['success', 'danger', 'warning', 'info', 'dark', 'primary', 'secondary'];
              var $state = states[stateNum],
                $name = full['fullName'],
                $initials = $name.match(/\b\w/g) || [];
              $initials = (($initials.shift() || '') + ($initials.pop() || '')).toUpperCase();
              $output = '<span class="avatar-initial rounded-circle bg-label-primary">' + $initials + '</span>';
            }
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-left align-items-center">' +
              '<div class="avatar-wrapper">' +
              '<div class="avatar avatar-sm me-3">' +
              $output +
              '</div>' +
              '</div>' +
              '<div class="d-flex flex-column">' +
              '<a href="' +
              userView +
              '" class="text-body text-truncate"><span class="fw-medium">' +
              $name +
              '</span></a>' +
              '<small class="text-muted">' +
              $email +
              '</small>' +
              '</div>' +
              '</div>';
            return $row_output;
          }
        },
        {
          // User Role ADMIN, SUPER_ADMIN, OWNER, TENANT, ACCOUNTANT, SECURITY_GUARD, BOARD_MEMBER, COEXISTENCE_COMMITTEE, AUDITOR
          targets: 1,
          render: function (data, type, full, meta) {
            const $role: keyof typeof roleBadgeObj = full['role'] as keyof typeof roleBadgeObj;
            const roleBadgeObj = {
              SUPER_ADMIN:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-cog bx-xs"></i></span>',
              ADMIN:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-pie-chart-alt bx-xs"></i></span>',
              OWNER:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-user bx-xs"></i></span>',
              TENANT:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-edit bx-xs"></i></span>',
              ACCOUNTANT:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-mobile-alt bx-xs"></i></span>',
              SECURITY_GUARD:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-edit bx-xs"></i></span>',
              BOARD_MEMBER:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-edit bx-xs"></i></span>',
              COEXISTENCE_COMMITTEE:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-edit bx-xs"></i></span>',
              AUDITOR:
                '<span class="badge badge-center rounded-pill bg-label-secondary w-px-30 h-px-30 me-2"><i class="bx bx-edit bx-xs"></i></span>'
            };

            const roleBadgeObjName = {
              SUPER_ADMIN:
                'Super Administrador',
              ADMIN:
                'Administrador',
              OWNER:
                'Propietario',
              TENANT:
                'Arrendatario',
              ACCOUNTANT:
                'Contador',
              SECURITY_GUARD:
                'Guarda de Seguridad',
              BOARD_MEMBER:
                'Miembro de la Junta',
              COEXISTENCE_COMMITTEE:
                'Comite de Convivencia',
              AUDITOR:
                'Auditor'
            };

            return `<span class='text-truncate d-flex align-items-center'>${roleBadgeObj[$role] ?? ''} ${roleBadgeObjName[$role] ?? $role}</span>`;
          }
        },
        {
          // Contact
          targets: 2,
          render: function (data, type, full, meta) {
            var $plan = full['contact'];

            return '<span class="fw-light">' + $plan + '</span>';
          }
        },
        {
          // User Status
          targets: 3,
          render: function (data, type, full, meta) {
            const $status: keyof typeof statusObj = full['status'] as keyof typeof statusObj;

            const statusObj = {
              ACTIVE: { title: 'Pending', class: 'bg-label-primary' },
              INACTIVE: { title: 'Active', class: 'bg-label-danger' }
            };

            return `<span class="badge ${statusObj[$status].class}">${$status}</span>`;
          }
        },
        {
          // Actions
          targets: -1,
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return `
            <a href="${userView}" class="btn btn-sm btn-icon"><i class="bx bx-edit-alt" title="Editar"></i></a>
            <a href="${userView}" class="btn btn-sm btn-icon"><i class="bx bx-block" title="Desactivar"></i></a>
            `;
          }
        }
      ],
      order: [[0, 'asc']],
      dom:
        '<"row mx-2"' +
        '<"col-sm-12 col-md-4 col-lg-6" l>' +
        '<"col-sm-12 col-md-8 col-lg-6"<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start d-flex align-items-center justify-content-md-end justify-content-center align-items-center flex-sm-nowrap flex-wrap me-1"<"me-3"f><"user_role w-px-200 pb-3 pb-sm-0">>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        zeroRecords: 'No se encontraron registros',
        emptyTable: 'Tabla vacia',
        search: 'Buscar',
        searchPlaceholder: 'Buscar...',
        processing: 'Procesando...',
        loadingRecords: 'Cargando...',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Ultimo'
        },
        lengthMenu: 'Mostrar _MENU_ registros',
        entries: 'registros',
        thousands: '',
        decimal: '.',
        aria: {
          sortAscending: 'Ordenar Ascerndente',
          sortDescending: 'Ordenar Descendente',
          paginate: {
            first: 'Primero',
            previous: 'Anterior',
            next: 'Siguiente',
            last: 'Ultimo'
          }
        },
        info: 'Mostrando página _PAGE_ de _PAGES_, total de registros _TOTAL_ ',
        infoEmpty: 'No hay registros',
        infoFiltered: ' - de un total de _MAX_ registros'
      },
      initComplete(settings, json) {

      },
    };
  }

}
