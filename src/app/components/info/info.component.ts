import { Component, ElementRef, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
  encapsulation: ViewEncapsulation.None, // Desactiva la encapsulación
})
export class InfoComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  contenidoHTML: string = '';

  ngOnInit(): void {
    // Genera el contenido dinámico
    this.contenidoHTML = `<div class="container-xxl flex-grow-1 container-p-y">
              <h4 class="py-3 mb-4"><span class="text-muted fw-light">UI elements /</span> Progress bars</h4>

              <!-- Options -->
              <div class="card mb-4">
                <h5 class="card-header">Progress bars</h5>
                <div class="card-body">
                  <div class="text-light small fw-medium">Default</div>
                  <div class="demo-vertical-spacing">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 25%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar w-75"
                        role="progressbar"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <hr class="m-0" />
                <div class="card-body">
                  <div class="text-light small fw-medium">Height</div>
                  <div class="demo-vertical-spacing">
                    <div class="progress" style="height: 6px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 25%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress" style="height: 10px">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 75%"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
                <hr class="m-0" />
                <div class="card-body">
                  <div class="text-light small fw-medium">With Label</div>
                  <div class="demo-vertical-spacing">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 25%"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100">
                        25%
                      </div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        style="width: 75%"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100">
                        75%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!--/ Options -->

              <!-- Backgrounds -->
              <div class="card mb-4">
                <h5 class="card-header">Backgrounds</h5>
                <div class="card-body">
                  <div class="demo-vertical-spacing demo-only-element">
                    <div class="progress">
                      <div
                        class="progress-bar bg-primary"
                        role="progressbar"
                        style="width: 20%"
                        aria-valuenow="20"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar bg-secondary"
                        role="progressbar"
                        style="width: 30%"
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar bg-success"
                        role="progressbar"
                        style="width: 40%"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar bg-danger"
                        role="progressbar"
                        style="width: 75%"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar bg-warning"
                        role="progressbar"
                        style="width: 60%"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar bg-info"
                        role="progressbar"
                        style="width: 50%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar bg-dark"
                        role="progressbar"
                        style="width: 85%"
                        aria-valuenow="85"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!--/ Backgrounds -->

              <!-- Striped -->
              <div class="card mb-4">
                <h5 class="card-header">Striped</h5>
                <div class="card-body">
                  <div class="demo-vertical-spacing demo-only-element">
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped bg-primary"
                        role="progressbar"
                        style="width: 20%"
                        aria-valuenow="20"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped bg-secondary"
                        role="progressbar"
                        style="width: 30%"
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped bg-success"
                        role="progressbar"
                        style="width: 40%"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped bg-danger"
                        role="progressbar"
                        style="width: 75%"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped bg-warning"
                        role="progressbar"
                        style="width: 60%"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped bg-info"
                        role="progressbar"
                        style="width: 50%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped bg-dark"
                        role="progressbar"
                        style="width: 85%"
                        aria-valuenow="85"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!--/ Striped -->

              <!-- Animated -->
              <div class="card mb-4">
                <h5 class="card-header">Animated</h5>
                <div class="card-body">
                  <div class="demo-vertical-spacing demo-only-element">
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped progress-bar-animated bg-primary"
                        role="progressbar"
                        style="width: 20%"
                        aria-valuenow="20"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped progress-bar-animated bg-secondary"
                        role="progressbar"
                        style="width: 30%"
                        aria-valuenow="30"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                        role="progressbar"
                        style="width: 40%"
                        aria-valuenow="40"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped progress-bar-animated bg-danger"
                        role="progressbar"
                        style="width: 75%"
                        aria-valuenow="75"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped progress-bar-animated bg-warning"
                        role="progressbar"
                        style="width: 60%"
                        aria-valuenow="60"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped progress-bar-animated bg-info"
                        role="progressbar"
                        style="width: 50%"
                        aria-valuenow="50"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                    <div class="progress">
                      <div
                        class="progress-bar progress-bar-striped progress-bar-animated bg-dark"
                        role="progressbar"
                        style="width: 85%"
                        aria-valuenow="85"
                        aria-valuemin="0"
                        aria-valuemax="100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <!--/ Animated -->

              <!-- Multiple bars -->
              <div class="card">
                <h5 class="card-header">Multiple bars</h5>
                <div class="card-body">
                  <div class="text-light small fw-medium mb-1">Default</div>
                  <div class="progress mb-3">
                    <div
                      class="progress-bar bg-primary shadow-none"
                      role="progressbar"
                      style="width: 15%"
                      aria-valuenow="15"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                    <div
                      class="progress-bar bg-success shadow-none"
                      role="progressbar"
                      style="width: 30%"
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                    <div
                      class="progress-bar bg-danger shadow-none"
                      role="progressbar"
                      style="width: 20%"
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>

                  <div class="text-light small fw-medium mb-1">Striped</div>
                  <div class="progress mb-3">
                    <div
                      class="progress-bar bg-primary progress-bar-striped shadow-none"
                      role="progressbar"
                      style="width: 15%"
                      aria-valuenow="15"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                    <div
                      class="progress-bar bg-success progress-bar-striped shadow-none"
                      role="progressbar"
                      style="width: 30%"
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                    <div
                      class="progress-bar bg-danger progress-bar-striped shadow-none"
                      role="progressbar"
                      style="width: 20%"
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>

                  <div class="text-light small fw-medium mb-1">Animated</div>
                  <div class="progress">
                    <div
                      class="progress-bar bg-primary progress-bar-striped progress-bar-animated shadow-none"
                      role="progressbar"
                      style="width: 15%"
                      aria-valuenow="15"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                    <div
                      class="progress-bar bg-success progress-bar-striped progress-bar-animated shadow-none"
                      role="progressbar"
                      style="width: 30%"
                      aria-valuenow="30"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                    <div
                      class="progress-bar bg-danger progress-bar-striped progress-bar-animated shadow-none"
                      role="progressbar"
                      style="width: 20%"
                      aria-valuenow="20"
                      aria-valuemin="0"
                      aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
              <!--/ Multiple bars -->
            </div>
    `;

    const contenedor = this.el.nativeElement.querySelector('.divInfo');
    contenedor.innerHTML = this.contenidoHTML;

  }

}
