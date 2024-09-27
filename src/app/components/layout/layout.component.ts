import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document){}

  ngOnInit(): void {
    //this.cargarScript('assets/vendor/js/menu.js');
    this.cargarScript('assets/js/main.js');
    //this.cargarScript('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js');
  }

  cargarScript(url: string) {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.async = true;
    this.renderer.appendChild(this.document.body, script);
  }

}
